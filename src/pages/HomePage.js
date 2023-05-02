import React, { useState, useEffect } from 'react';

import { getUserAllNoteData } from '../firebase//home.js';
import NavBar from '../components/Bar/NavBar/NavBar.js';
import FootBar from '../components/Bar/Footer/FootBar.js';
import EnrollBtn from '../components/EnrollBtn/EnrollBtn';

import Toolbar from '@mui/material/Toolbar';

import photoNotAvailable from '../images/photoNotAvailable.jpeg';

import '../styles/homePage.css';

function HomePage() {
	const [allCourses, setAllCourses] = useState([]);

	useEffect(() => {
		getUserAllNoteData(setAllCourses);
	}, []);
	return (
		<div className='homePage'>
			<NavBar />
			<div className='homePageContainer' component="main">
				<Toolbar />
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
		</div>
	);
}

export default HomePage;
