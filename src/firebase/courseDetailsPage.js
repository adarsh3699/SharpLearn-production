import { getFirestore, collection, onSnapshot, getDocs, query, where, limit } from 'firebase/firestore';

// const auth = getAuth();
const database = getFirestore();
// collection ref
const colRef = collection(database, 'All_Courses');

function getCourseDetails(courseId, setCourseDetail, setIsGetCourseApiLoading, handleMsgShown) {
	if (!courseId) return setIsGetCourseApiLoading(false);
	const getDataQuery = query(colRef, where('courseId', '==', courseId)); // orderBy('name', 'desc || ase')  where('courseId', 'in', ['PvULuhJoNuCk7S8Ty1Oo', '9FhQjNp1LBrsw6ilGOuO'])
	setIsGetCourseApiLoading(true);
	onSnapshot(
		colRef,
		async (realSnapshot) => {
			await getDocs(getDataQuery)
				.then((snapshot) => {
					let allCourses = [];
					snapshot.docs.forEach((doc) => {
						allCourses.push({
							courseId: doc.id,
							courseThumbnail: doc.data()?.courseThumbnail,
							courseName: doc.data()?.courseName,
							aboutCourse: doc.data()?.aboutCourse,
							courseDiscountedPrice: doc.data()?.courseDiscountedPrice,
							courseORGPrice: doc.data()?.courseORGPrice,
							courseType: doc.data()?.courseType,
							demoVideo: doc.data()?.demoVideo,
							courseLink: doc.data()?.courseLink,
							updatedOn: doc.data()?.updatedOn,
						});
					});
					setIsGetCourseApiLoading(false);
					setCourseDetail(...(allCourses || {}));
					if (!allCourses.length) return (window.location = '/all_courses');
				})
				.catch((err) => {
					setIsGetCourseApiLoading(false);
					console.log(err.message);
					handleMsgShown(err.code, 'error');
				});
		},
		(err) => {
			setIsGetCourseApiLoading(false);
			console.log(err);
			handleMsgShown(err.code, 'error');
		}
	);
}

function getOtherCourses(courseId, setOtherCourses, setIsGetCourseApiLoading, handleMsgShown) {
	if (!courseId) return setIsGetCourseApiLoading(false);
	const getDataQuery = query(colRef, where('courseId', '!=', courseId), limit(5)); // orderBy('name', 'desc || ase')  where('courseId', 'in', ['PvULuhJoNuCk7S8Ty1Oo', '9FhQjNp1LBrsw6ilGOuO'])
	onSnapshot(
		colRef,
		async (realSnapshot) => {
			await getDocs(getDataQuery)
				.then((snapshot) => {
					let allCourses = [];
					snapshot.docs.forEach((doc) => {
						allCourses.push({
							courseId: doc.id,
							courseThumbnail: doc.data()?.courseThumbnail,
							courseName: doc.data()?.courseName,
							aboutCourse: doc.data()?.aboutCourse,
							courseDiscountedPrice: doc.data()?.courseDiscountedPrice,
							courseORGPrice: doc.data()?.courseORGPrice,
							courseType: doc.data()?.courseType,
							demoVideo: doc.data()?.demoVideo,
							courseLink: doc.data()?.courseLink,
							updatedOn: doc.data()?.updatedOn,
						});
					});
					// setIsGetCourseApiLoading(false);
					setOtherCourses(allCourses || []);
				})
				.catch((err) => {
					// setIsGetCourseApiLoading(false);
					console.log(err.message);
					handleMsgShown(err.code, 'error');
				});
		},
		(err) => {
			// setIsGetCourseApiLoading(false);
			console.log(err);
			handleMsgShown(err.code, 'error');
		}
	);
}

export { getCourseDetails, getOtherCourses };
