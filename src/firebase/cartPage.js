// import { getAuth } from 'firebase/auth';
// import { encryptText, decryptText } from '../utils';

import {
	getFirestore,
	collection,
	onSnapshot,
	getDocs,
	// addDoc,
	// deleteDoc,
	// updateDoc,
	// doc,
	query,
	where,
	// limit,
	// serverTimestamp,
	orderBy,
} from 'firebase/firestore';

// const auth = getAuth();
const database = getFirestore();
// collection ref
const colRef = collection(database, 'All_Courses');

function getAllCartItems(setAllCourses, setIsGetCourseApiLoading, handleMsgShown) {
	const userCart = JSON.parse(localStorage.getItem('user_cart')) || [];
	if (userCart.length === 0) return setIsGetCourseApiLoading(false);
	const getDataQuery = query(colRef, where('courseId', 'in', userCart), orderBy('updatedOn', 'desc')); // orderBy('name', 'desc || ase')  where('courseId', 'in', ['PvULuhJoNuCk7S8Ty1Oo', '9FhQjNp1LBrsw6ilGOuO'])
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
					setAllCourses(allCourses);
					// console.log(allCourses);
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

export { getAllCartItems };
