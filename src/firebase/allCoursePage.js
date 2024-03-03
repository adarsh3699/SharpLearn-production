import { getFirestore, collection, onSnapshot, getDocs, query, orderBy } from 'firebase/firestore';

const database = getFirestore();
// collection ref
const colRef = collection(database, 'All_Courses');

// const userId = JSON.parse(localStorage.getItem('user_details'))?.userId || '';

function getAllcourses(setAllCourses, setIsGetCourseApiLoading, handleMsgShown) {
	const getDataQuery = query(colRef, orderBy('updatedOn', 'desc')); // orderBy('name', 'desc || ase')  where('courseId', 'in', ['PvULuhJoNuCk7S8Ty1Oo', '9FhQjNp1LBrsw6ilGOuO'])
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

// //Add Notes
// function addNewNote(upcomingData, setMyNotesId, setMsg, setIsApiLoading) {
//     const userId = auth?.currentUser?.uid;
//     const { newNotesTitle, newNoteData } = upcomingData;
//     const encryptTitle = encryptText(newNotesTitle ? newNotesTitle?.trim() : newNotesTitle);
//     const stringifyedNoteData = JSON.stringify(newNoteData);
//     const encryptNoteData = encryptText(stringifyedNoteData);

//     addDoc(colRef, {
//         userId,
//         notesTitle: encryptTitle,
//         noteData: encryptNoteData,
//         createdAt: serverTimestamp(),
//         updatedOn: serverTimestamp(),
//     })
//         .then((e) => {
//             setMyNotesId(e?.id);
//             setIsApiLoading(false);
//         })
//         .catch((err) => {
//             setIsApiLoading(false);
//             setMsg(err.code);
//             console.log(err);
//         });
// }
// //delete Notes
// function deleteData(noteId, setIsApiLoading, setMsg) {
//     const docRef = doc(database, 'user_notes', noteId);

//     deleteDoc(docRef)
//         .then((e) => {
//             setIsApiLoading(false);
//         })
//         .catch((err) => {
//             console.log(err.message);
//             setMsg(err.code);
//         });
// }

// //update notes
// function updateDocument(upcomingData, setIsSaveBtnLoading, setIsNotesModalOpen, setMsg) {
//     const { noteId, notesTitle, noteData } = upcomingData;
//     if (!noteId || !notesTitle || !noteData) {
//         setMsg('Please Provide all details');
//         setIsSaveBtnLoading(false);
//         return;
//     }
//     const encryptTitle = encryptText(notesTitle ? notesTitle?.trim() : notesTitle);
//     const stringifyedNoteData = JSON.stringify(noteData);
//     const encryptNoteData = encryptText(stringifyedNoteData);

//     const docRef = doc(database, 'user_notes', noteId);

//     updateDoc(docRef, {
//         notesTitle: encryptTitle,
//         noteData: encryptNoteData,
//         updatedOn: serverTimestamp(),
//     })
//         .then(() => {
//             setIsSaveBtnLoading(false);
//         })
//         .catch((err) => {
//             setIsNotesModalOpen(false);
//             setIsSaveBtnLoading(false);
//             console.log(err.message);
//         });
// }

export { getAllcourses };
