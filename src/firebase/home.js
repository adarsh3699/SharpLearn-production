import { getAuth } from 'firebase/auth';
// import { encryptText, decryptText } from '../utils';

import {
	getFirestore,
	collection,
	onSnapshot,
	getDocs,
	addDoc,
	deleteDoc,
	updateDoc,
	doc,
	query,
	where,
	serverTimestamp,
	orderBy,
} from 'firebase/firestore';

const auth = getAuth();
const database = getFirestore();
// collection ref
const colRef = collection(database, 'CS-Courses');

// const userId = JSON.parse(localStorage.getItem('user_details'))?.userId || '';

function getUserAllNoteData(setAllCourses, setIsApiLoading, setMsg) {
	const getDataQuery = query(colRef); // orderBy('name', 'desc || ase')
	// setIsApiLoading(true);
	onSnapshot(
		colRef,
		async (realSnapshot) => {
			await getDocs(getDataQuery)
				.then((snapshot) => {
					let allCourses = [];
					snapshot.docs.forEach((doc) => {
						allCourses.push({
							coursesId: doc.id,
							courseThumbnail: doc.data()?.courseThumbnail,
							courseName: doc.data()?.courseName,
							aboutCourse: doc.data()?.aboutCourse,
							coursePrice: doc.data()?.coursePrice,
							demoVideo: doc.data()?.demoVideo,
							updatedOn: doc.data().updatedOn,
						});
					});
					// setIsApiLoading(false);
					// setAllNotes(noteData);
					console.log(allCourses);
					setAllCourses(allCourses);
					// const encryptNotesData = encryptText(JSON.stringify(noteData));
					// localStorage.setItem('note_data', encryptNotesData);
				})
				.catch((err) => {
					// setIsApiLoading(false);
					console.log(err.message);
					// setMsg(err.code);
				});
		},
		(err) => {
			// setIsApiLoading(false);
			console.log(err);
			// setMsg(err.code);
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

export { getUserAllNoteData };
