import React, { useState, useEffect, useCallback } from 'react';
import { NavLink } from 'react-router-dom';

import { getCourseDetails, getOtherCourses } from '../firebase/courseDetailsPage.js';
import Loader from '../components/Loader/Loader.js';
import ShowMsg from '../components/ShowMsg/ShowMsg.js';
import MuiBtn from '../components/MuiBtn/MuiBtn.js';
import CoursesSlider from '../components/OtherCoursesSlider/CoursesSlider.js';

import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import DoneIcon from '@mui/icons-material/Done';
import IosShareIcon from '@mui/icons-material/IosShare';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import FlashOnRoundedIcon from '@mui/icons-material/FlashOnRounded';

import photoNotAvailable from '../images/photoNotAvailable.jpeg';
import arrow from '../images/arrow.svg';
import viewImg from '../images/view.png';

import '../styles/courseDetailsPage.css';

function HomePage() {
	const [courseId, setCourseId] = useState('');
	const [courseDetail, setCourseDetail] = useState({});
	const [othercourses, setOtherCourses] = useState([]);
	const [msg, setMsg] = useState({ text: '', type: '' });
	const [isGetCourseApiLoading, setIsGetCourseApiLoading] = useState(false);

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
		const courseId = window.location.pathname.split('/').pop();
		if (courseId === 'course' || courseId === '') return (window.location = '/all_courses');
		setCourseId(courseId);
		getCourseDetails(courseId, setCourseDetail, setIsGetCourseApiLoading, handleMsgShown);
		getOtherCourses(courseId, setOtherCourses, setIsGetCourseApiLoading, handleMsgShown);
	}, [handleMsgShown]);

	const handleAddToCartBtnClick = useCallback(() => {
		const userCart = JSON.parse(localStorage.getItem('user_cart')) || [];
		if (!userCart.includes(courseId)) {
			userCart.push(courseId);
			localStorage.setItem('user_cart', JSON.stringify(userCart));
			handleMsgShown('Course Added to Cart', 'success');
		} else {
			handleMsgShown('Course Already in Cart', 'warning');
		}
	}, [courseId, handleMsgShown]);

	const handleClick = useCallback(() => {
		// console.log(window.location.pathname.split("/").pop());
		// window.location = `/courses/${courseId}`;
	}, []);

	return (
		<div className="courseDetailsPage">
			<Toolbar />
			<div className="courseDetailsBox">
				<div className="courseDetailsBoxLeft">
					<img src={courseDetail?.courseThumbnail} className="courseDetailImage" alt="" />
				</div>
				<div className="courseDetailsBoxRight">
					<div className="courseTypeShare">
						<div className="courseDetailType">{courseDetail?.courseType}</div>
						<IconButton aria-label="delete">
							<IosShareIcon />
						</IconButton>
					</div>

					<div className="openCourseTitle">{courseDetail?.courseName}</div>
					<div className="openCourseDesc">{courseDetail?.aboutCourse}</div>
					<div className="openCoursePrice">
						<span className="openCourseDisPrice">₹{courseDetail?.courseDiscountedPrice}</span>
						<span className="openCourseOrgPrice">₹{courseDetail?.courseORGPrice}</span>
						<span className="openCourseDisPricePercent">
							{((courseDetail?.courseORGPrice - courseDetail?.courseDiscountedPrice) /
								courseDetail?.courseORGPrice) *
								100}
							% off
						</span>
					</div>
					<Button
						variant="contained"
						color="secondary"
						className="openCourseBtn"
						sx={{ mt: 3, mr: 2, py: 1.2, px: 2.5 }}
						startIcon={<ShoppingCartRoundedIcon />}
						onClick={handleAddToCartBtnClick}
					>
						Add to Cart
					</Button>
					<Button
						variant="contained"
						color="warning"
						className="openCourseBtn"
						sx={{ mt: 3, py: 1.2, px: 2.5 }}
						startIcon={<FlashOnRoundedIcon />}
						onClick={handleClick}
					>
						Buy Now
					</Button>
				</div>
			</div>

			<iframe
				className='youtubeVideoIframe'
				src="https://www.youtube.com/embed/g_DHKoj7n8U"
				title="YouTube video player"
				frameborder="0"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
				allowfullscreen
			></iframe>

			<CoursesSlider allCourses={othercourses} />

			{msg && <ShowMsg isError={msg?.text ? true : false} msgText={msg?.text} type={msg?.type} />}
		</div>
	);
}

export default HomePage;
