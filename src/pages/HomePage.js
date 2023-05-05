import React, { useState, useEffect, useCallback } from 'react';

import { getAllcourses } from '../firebase//home.js';
import Loader from '../components/Loader/Loader.js';
import ShowMsg from '../components/ShowMsg/ShowMsg.js';
import MuiBtn from '../components/MuiBtn/MuiBtn.js';

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

	return (
		<div className="homePage">
			<div className="homePageContainer" component="main">
				<Toolbar />
				<Loader isLoading={isGetCourseApiLoading} />
				{allCourses.map((item, index) => {
					return (
						<div className="courseBox" key={index}>
							<img
								className="courseImg"
								src={item?.courseThumbnail || photoNotAvailable}
								loading="lazy"
								alt=""
							/>
							<div className="courseDetails">
								<div className="courseTitle">{item?.courseName}</div>
								<div className="aboutCourse">{item?.aboutCourse}</div>
								<div className="coursePrice">₹{item?.courseDiscountedPrice}</div>
								<MuiBtn
									BtnTitle="Buy Now"
									color="success"
									sx={{ py: { xs: 0.5, sm: 1 }, px: { sx: 2, sm: 4 }, fontSize: { xs: 15, sm: 18 } }}
								/>
								<MuiBtn
									BtnTitle="Add to Cart"
									color="info"
									sx={{
										marginLeft: 3,
										py: { xs: 0.5, sm: 1 },
										px: { sx: 2, sm: 4 },
										fontSize: { xs: 15, sm: 18 },
									}}
									onBtnClick={() => handleAddToCartBtnClick(item?.courseId)}
								/>
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
