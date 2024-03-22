import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	updateProfile,
	sendEmailVerification,
	signOut,
	onAuthStateChanged,
	sendPasswordResetEmail,
} from 'firebase/auth';

const auth = getAuth();

const user_details = JSON.parse(localStorage.getItem('user_details'));

function handleLoginForm(e, setMsg, setIsApiLoading) {
	e.preventDefault();
	const email = e.target.email.value;
	const password = e.target.password.value;

	if (!email || !password) return setMsg('Please Enter Your Email and Password');
	setIsApiLoading(true);

	signInWithEmailAndPassword(auth, email, password)
		.then((cred) => {
			setIsApiLoading(false);
			localStorage.setItem('user_profile_img', cred?.user?.photoURL);
			localStorage.setItem(
				'user_details',
				JSON.stringify({
					userName: cred?.user?.displayName,
					email,
					userId: cred?.user?.uid,
				})
			);
			document.location.href = '/';
		})
		.catch((err) => {
			setIsApiLoading(false);
			setMsg(err.code);
		});
}

function handleSignUpForm(e, setMsg, setIsApiLoading) {
	e.preventDefault();
	const userName = e.target.userName?.value;
	const email = e.target.email?.value;
	const password = e.target.password?.value;
	const confPassword = e.target.confPassword?.value;

	if (!email || !password || !confPassword || !userName) return setMsg('Please enter all data');
	if (password !== confPassword) return setMsg("Passwords didn't match.");

	setIsApiLoading(true);

	createUserWithEmailAndPassword(auth, email, password)
		.then((cred) => {
			sendEmailVerification(cred.user).then(() => {
				// setMsg('Email verification sent. Please also check in spam');
			});

			updateProfile(cred.user, { displayName: userName })
				.then(() => {
					setIsApiLoading(false);
					localStorage.setItem(
						'user_details',
						JSON.stringify({
							userName,
							email,
							userId: cred?.user?.uid,
						})
					);
					document.location.href = '/home';
				})
				.catch((err) => {
					setIsApiLoading(false);
					setMsg(err.code);
				});
		})
		.catch((err) => {
			setMsg(err.code);
			setIsApiLoading(false);
		});
}

function handleSignOut() {
	signOut(auth)
		.then(() => {
			localStorage.clear();
			document.location.href = '/login';
		})
		.catch((err) => {
			console.log(err.code);
			alert(err.code);
		})
		.finally(() => {
			console.log('SignOut');
		});
}

function handleForgetPassword(e, setMsg, setIsOTPApiLoading) {
	e.preventDefault();

	const email = e.target.email.value;
	sendPasswordResetEmail(auth, email)
		.then(() => {
			setIsOTPApiLoading(false);
			setMsg('Password reset email sent. Please also check spam');
		})
		.catch((error) => {
			setIsOTPApiLoading(false);
			setMsg(error.code);
			console.log(error.code);
		});
}

function handleUserState(currentPage, setIsLoading) {
	if (!currentPage) return console.log('Missing currentPage');

	onAuthStateChanged(auth, (user) => {
		if (user && !user_details) {
			localStorage.setItem(
				'user_details',
				JSON.stringify({
					userName: user?.displayName || 'N/A',
					email: user?.email,
					userId: user?.uid,
				})
			);
		}
		if (currentPage === 'loginPage' && user !== null) {
			document.location.href = '/';
		} else if (currentPage !== 'loginPage' && user === null) {
			// document.location.href = '/login';
			setIsLoading(false);
		} else if (currentPage === 'loginPage' && user === null) {
			localStorage.clear();
			setIsLoading(false);
		}
		// return !!user;
	});
}

export { handleSignUpForm, handleLoginForm, handleSignOut, handleUserState, handleForgetPassword };
