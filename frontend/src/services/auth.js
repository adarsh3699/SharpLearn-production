import { apiCall } from '../utils';

// Get stored user details
const getUserDetails = () => {
	return JSON.parse(localStorage.getItem('user_details'));
};

// Get stored token
const getToken = () => {
	return localStorage.getItem('auth_token');
};

// Set auth headers for API calls
const getAuthHeaders = () => {
	const token = getToken();
	return token ? { Authorization: `Bearer ${token}` } : {};
};

function handleLoginForm(e, setMsg, setIsApiLoading) {
	e.preventDefault();
	const email = e.target.email.value;
	const password = e.target.password.value;

	if (!email || !password) return setMsg('Please Enter Your Email and Password');
	setIsApiLoading(true);

	apiCall('auth/login', 'POST', { email, password })
		.then((response) => {
			setIsApiLoading(false);
			if (response.statusCode === 200) {
				// Store token and user details
				localStorage.setItem('auth_token', response.token);
				localStorage.setItem(
					'user_details',
					JSON.stringify({
						userName: response.user.userName,
						email: response.user.email,
						userId: response.user.userId,
					})
				);
				localStorage.setItem('user_profile_img', response.user.profileImg || '');
				localStorage.setItem('current_balance', response.user.currentBalance);

				document.location.href = '/';
			} else {
				setMsg(response.msg);
			}
		})
		.catch((err) => {
			setIsApiLoading(false);
			setMsg('Login failed. Please try again.');
			console.error(err);
		});
}

function handleSignUpForm(e, setMsg, setIsApiLoading, referralCode) {
	e.preventDefault();
	const userName = e.target.userName?.value;
	const email = e.target.email?.value;
	const password = e.target.password?.value;
	const confPassword = e.target.confPassword?.value;

	if (!email || !password || !confPassword || !userName) {
		return setMsg('Please enter all data');
	}
	if (password !== confPassword) {
		return setMsg("Passwords didn't match.");
	}

	setIsApiLoading(true);

	apiCall('auth/register', 'POST', { userName, email, password, referralCode })
		.then((response) => {
			setIsApiLoading(false);
			if (response.statusCode === 201) {
				// Store token and user details
				localStorage.setItem('auth_token', response.token);
				localStorage.setItem(
					'user_details',
					JSON.stringify({
						userName: response.user.userName,
						email: response.user.email,
						userId: response.user.userId,
					})
				);
				localStorage.setItem('user_profile_img', response.user.profileImg || '');
				localStorage.setItem('current_balance', response.user.currentBalance);

				document.location.href = '/';
			} else {
				setMsg(response.msg);
			}
		})
		.catch((err) => {
			setIsApiLoading(false);
			setMsg('Registration failed. Please try again.');
			console.error(err);
		});
}

function handleSignOut() {
	// Clear all local storage
	localStorage.clear();
	document.location.href = '/login';
}

function handleForgetPassword(e, setMsg, setIsOTPApiLoading) {
	e.preventDefault();
	setIsOTPApiLoading(true);

	const email = e.target.email.value;
	const newPassword = prompt('Enter your new password:');

	if (!newPassword) {
		setIsOTPApiLoading(false);
		return;
	}

	apiCall('auth/reset-password', 'POST', { email, newPassword })
		.then((response) => {
			setIsOTPApiLoading(false);
			if (response.statusCode === 200) {
				setMsg('Password reset successful. Please login with new password.');
			} else {
				setMsg(response.msg);
			}
		})
		.catch((error) => {
			setIsOTPApiLoading(false);
			setMsg('Password reset failed. Please try again.');
			console.error(error);
		});
}

function handleUserState(currentPage, setIsLoading) {
	if (!currentPage) return;

	const userDetails = getUserDetails();
	const token = getToken();

	// If on login page and user is logged in, redirect to home
	if (currentPage === 'loginPage' && userDetails && token) {
		// Optionally redirect to home, but let component handle it
	}
	// If not on login page and user is not logged in, redirect to login
	else if (currentPage !== 'loginPage' && (!userDetails || !token)) {
		// document.location.href = '/login';
		setIsLoading(false);
	}
	// If on login page and no user, show login page
	else if (currentPage === 'loginPage' && (!userDetails || !token)) {
		localStorage.clear();
		setIsLoading(false);
	} else {
		setIsLoading(false);
	}
}

// Get user profile from backend
function getUserProfile() {
	const headers = getAuthHeaders();
	return apiCall('auth/profile', 'GET', null, headers);
}

export {
	handleSignUpForm,
	handleLoginForm,
	handleSignOut,
	handleUserState,
	handleForgetPassword,
	getUserDetails,
	getToken,
	getAuthHeaders,
	getUserProfile,
};
