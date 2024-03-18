import React from 'react';
// import { NavLink } from 'react-router-dom';

// import { getcourses } from '../firebase/homePage';
// import Loader from '../components/Loader/Loader';
// import ShowMsg from '../components/ShowMsg/ShowMsg';
// import CoursesSlider from '../components/OtherCoursesSlider/CoursesSlider';
import EnrolledCourses from '../components/enrolledCourses/EnrolledCourses';

import Toolbar from '@mui/material/Toolbar';
// import Button from '@mui/material/Button';

// import photoNotAvailable from '../images/photoNotAvailable.jpeg';

import '../styles/homePage.css';

function HomePage() {
	// const [msg, setMsg] = useState({ text: '', type: '' });
	// const [isGetCourseApiLoading, setIsGetCourseApiLoading] = useState(true);
	// const [allCourses, setAllCourses] = useState([]);
	const currentBalance = localStorage.getItem('current_balance') || 10000;

	// const handleMsgShown = useCallback((msgText, type) => {
	// 	if (msgText) {
	// 		setMsg({ text: msgText, type: type });
	// 		setTimeout(() => {
	// 			setMsg({ text: '', type: '' });
	// 		}, 2500);
	// 	} else {
	// 		console.log('Please Provide Text Msg');
	// 	}
	// }, []);

	return (
		<div className="homePage">
			<Toolbar />
			<div className="myIntro">
				<div className="text1">WelCome To</div>
				<div className="text2">Employee SharpLearn</div>
				<div className="text3">platform</div>
				<p className="text4">
					A comprehensive program that covers the fundamentals of Low Level to high level design & program.
					<br /> It includes lectures and practices to help the employees develop and provide them efficient
					solutions.
					<br /> This platform is suitable for beginners as well as experienced employees
					<br /> that aims to skill up their expertise.
				</p>
			</div>

			<div className="homePageCurrentBalance">
				Your Current Balance: <span>₹{currentBalance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</span>
			</div>

			{/* <Loader isLoading={isGetCourseApiLoading} sx={{ marginTop: '20px' }} /> */}
			<EnrolledCourses />

			{/* {msg && <ShowMsg isError={msg?.text ? true : false} msgText={msg?.text} type={msg?.type} />} */}
		</div>
	);
}

export default HomePage;
