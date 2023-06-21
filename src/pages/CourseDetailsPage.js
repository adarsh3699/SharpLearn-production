import React, { useState, useEffect, useCallback } from 'react';
// import { NavLink } from 'react-router-dom';

import { getCourseDetails, getOtherCourses } from '../firebase/courseDetailsPage.js';
import Loader from '../components/Loader/Loader.js';
import ShowMsg from '../components/ShowMsg/ShowMsg.js';
import CoursesSlider from '../components/OtherCoursesSlider/CoursesSlider.js';

import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import IosShareIcon from '@mui/icons-material/IosShare';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import FlashOnRoundedIcon from '@mui/icons-material/FlashOnRounded';
import Tooltip from '@mui/material/Tooltip';

import photoNotAvailable from '../images/photoNotAvailable.jpeg';

import '../styles/courseDetailsPage.css';

function HomePage() {
	const [courseId, setCourseId] = useState('');
	const [courseDetail, setCourseDetail] = useState({});
	const [othercourses, setOtherCourses] = useState([]);
	const [msg, setMsg] = useState({ text: '', type: '' });
	const [isGetCourseApiLoading, setIsGetCourseApiLoading] = useState(true);
	const [shareBtnTooltip, setShareBtnTooltip] = useState('Click to Copy');

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

	const handleShareBtnClick = useCallback(() => {
		navigator.clipboard.writeText(window.location?.href);
		handleMsgShown('Shearing Link Copied', 'success');
		setShareBtnTooltip('Link Copied');
		setTimeout(() => {
			setShareBtnTooltip('Click to Copy');
		}, 2500);
	}, [handleMsgShown]);

	return (
		<div className="courseDetailsPage">
			<Toolbar />
			<Loader isLoading={isGetCourseApiLoading} />
			{!isGetCourseApiLoading && (
				<>
					<div className="courseDetailsBox">
						<div className="courseDetailsBoxLeft">
							<img
								src={courseDetail?.courseThumbnail || photoNotAvailable}
								className="courseDetailImage"
								alt=""
							/>
						</div>
						<div className="courseDetailsBoxRight">
							<div className="courseTypeShare">
								<div className="courseDetailType">{courseDetail?.courseType}</div>
								<Tooltip
									title={<span style={{ fontSize: '17px', padding: '5px' }}>{shareBtnTooltip}</span>}
									style={{ fontSize: 20 }}
									arrow
									placement="top"
								>
									<IconButton aria-label="delete" onClick={handleShareBtnClick}>
										<IosShareIcon />
									</IconButton>
								</Tooltip>
							</div>

							<div className="openCourseTitle">{courseDetail?.courseName}</div>
							<div className="openCourseDesc">{courseDetail?.aboutCourse}</div>
							<div className="openCoursePrice">
								<span className="openCourseDisPrice">₹{courseDetail?.courseDiscountedPrice}</span>
								<span className="openCourseOrgPrice">₹{courseDetail?.courseORGPrice}</span>
								<span className="openCourseDisPricePercent">
									{(
										((courseDetail?.courseORGPrice - courseDetail?.courseDiscountedPrice) /
											courseDetail?.courseORGPrice) *
										100
									).toFixed(2)}
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
								onClick={() => handleMsgShown('This feature is not available now', 'warning')}
							>
								Buy Now
							</Button>
						</div>
					</div>

					<div className="CoursesDemoTitle">
						Course Demo<div className="titleBorder"></div>
					</div>

					<iframe
						className="youtubeVideoIframe"
						src={'https://www.youtube-nocookie.com/embed/' + courseDetail?.demoVideo}
						title="YouTube video player"
						frameBorder="0"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
						allowFullScreen
					></iframe>

					<div className="CoursesDemoTitle">
						Other Courses<div className="titleBorder"></div>
					</div>
					<CoursesSlider allCourses={othercourses} />
				</>
			)}

			{msg && <ShowMsg isError={msg?.text ? true : false} msgText={msg?.text} type={msg?.type} />}
		</div>
	);
}

export default HomePage;
