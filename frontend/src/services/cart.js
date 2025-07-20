import { apiCall } from '../utils';
import { getAuthHeaders } from './auth';

// Get cart items
function getAllCartItems(setAllCourses, setIsGetCourseApiLoading, handleMsgShown) {
	const headers = getAuthHeaders();

	// Check if user is authenticated
	if (!headers.Authorization) {
		setIsGetCourseApiLoading(false);
		return;
	}

	setIsGetCourseApiLoading(true);

	apiCall('cart', 'GET', null, headers)
		.then((response) => {
			setIsGetCourseApiLoading(false);
			if (response.statusCode === 200) {
				// Transform data to match previous structure
				const transformedCourses = response.courses.map((course) => ({
					courseId: course._id,
					courseThumbnail: course.courseThumbnail,
					courseName: course.courseName,
					aboutCourse: course.aboutCourse,
					courseDiscountedPrice: course.courseDiscountedPrice,
					courseORGPrice: course.courseORGPrice,
					courseType: course.courseType,
					demoVideo: course.demoVideo,
					courseLink: course.courseLink,
					updatedOn: course.updatedOn,
				}));
				setAllCourses(transformedCourses);
			} else {
				handleMsgShown(response.msg, 'error');
			}
		})
		.catch((err) => {
			setIsGetCourseApiLoading(false);
			handleMsgShown('Failed to load cart items', 'error');
		});
}

// Add item to cart
function addToCart(courseId, handleMsgShown) {
	const headers = getAuthHeaders();

	if (!headers.Authorization) {
		handleMsgShown('Please login to add items to cart', 'error');
		return Promise.reject('Not authenticated');
	}

	return apiCall('cart/add', 'POST', { courseId }, headers)
		.then((response) => {
			if (response.statusCode === 200) {
				handleMsgShown('Course added to cart successfully', 'success');
			} else {
				handleMsgShown(response.msg, 'error');
			}
			return response;
		})
		.catch((err) => {
			handleMsgShown('Failed to add course to cart', 'error');
			throw err;
		});
}

// Remove item from cart
function removeFromCart(courseId, handleMsgShown) {
	const headers = getAuthHeaders();

	if (!headers.Authorization) {
		handleMsgShown('Please login to remove items from cart', 'error');
		return Promise.reject('Not authenticated');
	}

	return apiCall(`cart/remove/${courseId}`, 'DELETE', null, headers)
		.then((response) => {
			if (response.statusCode === 200) {
				handleMsgShown('Course removed from cart successfully', 'success');
			} else {
				handleMsgShown(response.msg, 'error');
			}
			return response;
		})
		.catch((err) => {
			handleMsgShown('Failed to remove course from cart', 'error');
			throw err;
		});
}

// Purchase cart items
function purchaseCartItems(handleMsgShown, onSuccess) {
	const headers = getAuthHeaders();

	if (!headers.Authorization) {
		handleMsgShown('Please login to make a purchase', 'error');
		return Promise.reject('Not authenticated');
	}

	return apiCall('cart/purchase', 'POST', {}, headers)
		.then((response) => {
			if (response.statusCode === 200) {
				handleMsgShown(`Purchase successful! Total cost: ₹${response.totalCost}`, 'success');
				// Update local balance
				localStorage.setItem('current_balance', response.newBalance);
				if (onSuccess) onSuccess(response);
			} else {
				handleMsgShown(response.msg, 'error');
			}
			return response;
		})
		.catch((err) => {
			handleMsgShown('Purchase failed. Please try again.', 'error');
			throw err;
		});
}

export { getAllCartItems, addToCart, removeFromCart, purchaseCartItems };
