import React, { useState, useEffect, useCallback } from 'react';

import { getAllcourses } from '../firebase/allCoursePage.js';
import Loader from '../components/Loader/Loader.js';
import ShowMsg from '../components/ShowMsg/ShowMsg.js';

import Toolbar from '@mui/material/Toolbar';

import photoNotAvailable from '../images/photoNotAvailable.jpeg';

import '../styles/allCoursePage.css';

function HomePage() {
	const [msg, setMsg] = useState({ text: '', type: '' });
	const [isGetCourseApiLoading, setIsGetCourseApiLoading] = useState(true);
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
		getAllcourses(setAllCourses, setIsGetCourseApiLoading, handleMsgShown);
	}, [handleMsgShown]);

	const handleAddToCartBtnClick = useCallback(
		(courseId) => {
			const userCart = JSON.parse(localStorage.getItem('user_cart')) || [];
			if (!userCart.includes(courseId)) {
				userCart.push(courseId);
				localStorage.setItem('user_cart', JSON.stringify(userCart));
				handleMsgShown('Course Added to Cart', 'success');
			} else {
				handleMsgShown('Course Already in Cart', 'warning');
			}
		},
		[handleMsgShown]
	);

	const handleCourseClick = useCallback((courseId) => {
		console.log(courseId);
		window.open(`/course/${courseId}`, '_blank');
		// window.location = `/course/${courseId}`;
	}, []);

	return (
		<div className="coursePage">
			<div className="homePageContainer" component="main">
				<Toolbar />
				<Loader isLoading={isGetCourseApiLoading} />
				{allCourses.map((item, index) => {
					return (
						<div className="courseBox" onClick={() => handleCourseClick(item.courseId)} key={index}>
							<img
								className="courseImg"
								src={item?.courseThumbnail || photoNotAvailable}
								loading="lazy"
								alt=""
							/>
							<div className="courseDetails">
								<div className="courseTitle">{item?.courseName}</div>
								<div className="aboutCourse">{item?.aboutCourse}</div>
								<div className='coursePriceBox'>
									<span className="courseDisPrice">₹{item?.courseDiscountedPrice}</span>
									<span className="courseOrgPrice">₹{item?.courseORGPrice}</span>
									<span className="courseDiscountPercent">{((item?.courseORGPrice - item?.courseDiscountedPrice) / item?.courseORGPrice * 100).toFixed(2)}% off</span>
								</div>
							</div>
						</div>
					);
				})}
			</div>
			{msg && <ShowMsg isError={msg?.text ? true : false} msgText={msg?.text} type={msg?.type} />}
		</div>
	);
}

export default HomePage;
