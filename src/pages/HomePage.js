import React, { useState, useEffect, useCallback } from 'react';

import { getUserAllNoteData } from '../firebase//home.js';
import NavBar from '../components/Bar/NavBar/NavBar.js';
import FootBar from '../components/Bar/Footer/FootBar.js';
import EnrollBtn from '../components/EnrollBtn/EnrollBtn';
import Loader from '../components/Loader/Loader.js';
import ShowMsg from '../components/ShowMsg/ShowMsg.js';

import Toolbar from '@mui/material/Toolbar';

import photoNotAvailable from '../images/photoNotAvailable.jpeg';

import '../styles/homePage.css';

function HomePage() {
	const [msg, setMsg] = useState({ text: '', type: '' });
	const [isGetCourseApiLoading, setIsGetCourseApiLoading] = useState(false);
	const [allCourses, setAllCourses] = useState([]);

	const handleMsgShown = useCallback((msgText, type) => {
		if (msgText) {
			setMsg({ text: msgText, type: type });
			setTimeout(() => {
				setMsg({ text: '', type: '' });
			}, 2500);
		} else {
			console.log('Please Provide Text Msg');
		}
	}, []);

	useEffect(() => {
		getUserAllNoteData(setAllCourses, setIsGetCourseApiLoading, handleMsgShown);
	}, [handleMsgShown]);
	return (
		<div className='homePage'>
			<NavBar />
			<div className='homePageContainer' component="main">
				<Toolbar />
				<Loader isLoading={isGetCourseApiLoading} />
				{allCourses.map((item, index) => {
					return (
						<div className="courseBox" key={index}>
							<img className="courseImg" src={item?.courseThumbnail || photoNotAvailable} loading="lazy" alt="" />
							<div className="courseDetails">
								<div className="courseTitle">{item?.courseName}</div>
								<div className="aboutCourse">{item?.aboutCourse}</div>
								<div className="coursePrice">₹{item?.coursePrice}</div>
								<EnrollBtn />
							</div>
						</div>
					);
				})}
			</div>
			<FootBar />

			{msg && <ShowMsg isError={msg?.text ? true : false} msgText={msg?.text} type={msg?.type} />}
		</div>
	);
}

export default HomePage;
