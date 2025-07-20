import { apiCall } from '../utils';

// Get all courses (with optional search)
function getAllcourses(setAllCourses, setIsGetCourseApiLoading, handleMsgShown, searchQuery = '') {
	setIsGetCourseApiLoading(true);

	const url = searchQuery ? `courses?search=${encodeURIComponent(searchQuery)}` : 'courses';

	apiCall(url)
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

				// Show search result message if searching
				if (searchQuery) {
					handleMsgShown(response.msg, transformedCourses.length > 0 ? 'success' : 'warning');
				}
			} else {
				handleMsgShown(response.msg, 'error');
			}
		})
		.catch((err) => {
			setIsGetCourseApiLoading(false);
			handleMsgShown('Failed to load courses', 'error');
		});
}

// Get limited courses (for homepage)
function getcourses(setAllCourses, setIsGetCourseApiLoading, handleMsgShown) {
	setIsGetCourseApiLoading(true);

	apiCall('courses-limited?limit=7')
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
			handleMsgShown('Failed to load courses', 'error');
		});
}

// Get course details
function getCourseDetails(courseId, setCourseDetail, setIsGetCourseApiLoading, handleMsgShown) {
	if (!courseId) return setIsGetCourseApiLoading(false);

	setIsGetCourseApiLoading(true);

	apiCall(`courses/${courseId}`)
		.then((response) => {
			setIsGetCourseApiLoading(false);
			if (response.statusCode === 200) {
				// Transform data to match previous structure
				const transformedCourse = {
					courseId: response.course._id,
					courseThumbnail: response.course.courseThumbnail,
					courseName: response.course.courseName,
					aboutCourse: response.course.aboutCourse,
					courseDiscountedPrice: response.course.courseDiscountedPrice,
					courseORGPrice: response.course.courseORGPrice,
					courseType: response.course.courseType,
					demoVideo: response.course.demoVideo,
					courseLink: response.course.courseLink,
					updatedOn: response.course.updatedOn,
				};
				setCourseDetail(transformedCourse);
			} else {
				handleMsgShown(response.msg, 'error');
				if (response.statusCode === 404) {
					window.location = '/All_Courses';
				}
			}
		})
		.catch((err) => {
			setIsGetCourseApiLoading(false);
			handleMsgShown('Failed to load course details', 'error');
		});
}

// Get other courses (excluding specific course)
function getOtherCourses(courseId, setOtherCourses, setIsGetCourseApiLoading, handleMsgShown) {
	if (!courseId) return setIsGetCourseApiLoading(false);

	apiCall(`courses-other/${courseId}?limit=5`)
		.then((response) => {
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
				setOtherCourses(transformedCourses || []);
			} else {
				handleMsgShown(response.msg, 'error');
			}
		})
		.catch((err) => {
			handleMsgShown('Failed to load other courses', 'error');
		});
}

export { getAllcourses, getcourses, getCourseDetails, getOtherCourses };
