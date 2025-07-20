import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

import { getAllcourses } from '../services/courses.js';
import Loader from '../components/Loader/Loader.js';
import ShowMsg from '../components/ShowMsg/ShowMsg.js';

import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import ClearIcon from '@mui/icons-material/Clear';

import photoNotAvailable from '../images/photoNotAvailable.jpeg';

import '../styles/allCoursePage.css';

function HomePage() {
	const [msg, setMsg] = useState({ text: '', type: '' });
	const [isGetCourseApiLoading, setIsGetCourseApiLoading] = useState(true);
	const [allCourses, setAllCourses] = useState([]);
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();

	const handleMsgShown = useCallback((msgText, type) => {
		if (msgText) {
			setMsg({ text: msgText, type: type });
			setTimeout(() => {
				setMsg({ text: '', type: '' });
			}, 2500);
		}
	}, []);

	useEffect(() => {
		const searchQuery = searchParams.get('search') || '';
		getAllcourses(setAllCourses, setIsGetCourseApiLoading, handleMsgShown, searchQuery);
	}, [handleMsgShown, searchParams]);

	// const handleAddToCartBtnClick = useCallback(
	// 	(courseId) => {
	// 		const userCart = JSON.parse(localStorage.getItem('user_cart')) || [];
	// 		if (!userCart.includes(courseId)) {
	// 			userCart.push(courseId);
	// 			localStorage.setItem('user_cart', JSON.stringify(userCart));
	// 			handleMsgShown('Course Added to Cart', 'success');
	// 		} else {
	// 			handleMsgShown('Course Already in Cart', 'warning');
	// 		}
	// 	},
	// 	[handleMsgShown]
	// );

	const handleCourseClick = useCallback((courseId) => {
		// navigate(`/course/${courseId}`);
		window.location = `/course/${courseId}`;
	}, []);

	const handleClearSearch = useCallback(() => {
		navigate('/All_Courses');
	}, [navigate]);

	const searchQuery = searchParams.get('search') || '';

	return (
		<div className="coursePage">
			<div className="homePageContainer" component="main">
				<Toolbar />
				{searchQuery && (
					<div className="searchResultsHeader">
						<div className="searchResultsContent">
							<div className="searchResultsText">
								<h2>Search Results for: "{searchQuery}"</h2>
								<p>{allCourses.length} courses found</p>
							</div>
							<Button
								variant="outlined"
								startIcon={<ClearIcon />}
								onClick={handleClearSearch}
								sx={{
									borderColor: '#4caf50',
									color: '#4caf50',
									'&:hover': {
										borderColor: '#45a049',
										backgroundColor: 'rgba(76, 175, 80, 0.04)',
									},
								}}
							>
								View All Courses
							</Button>
						</div>
					</div>
				)}
				<Loader isLoading={isGetCourseApiLoading} />
				{!isGetCourseApiLoading && allCourses.length === 0 && searchQuery && (
					<div className="noSearchResults">
						<h3>No courses found for "{searchQuery}"</h3>
						<p>Try searching with different keywords or browse all courses.</p>
					</div>
				)}
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
								<div className="coursePriceBox">
									<span className="courseDisPrice">₹{item?.courseDiscountedPrice}</span>
									<span className="courseOrgPrice">₹{item?.courseORGPrice}</span>
									<span className="courseDiscountPercent">
										{(
											((item?.courseORGPrice - item?.courseDiscountedPrice) /
												item?.courseORGPrice) *
											100
										).toFixed(2)}
										% off
									</span>
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
