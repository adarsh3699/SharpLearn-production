import React, { useEffect, useState } from 'react';
import { apiCall } from '../utils';
// import { NavLink } from 'react-router-dom';

import EnrolledCourses from '../components/enrolledCourses/EnrolledCourses';

import Toolbar from '@mui/material/Toolbar';

import '../styles/homePage.css';

function HomePage() {
	// const [msg, setMsg] = useState({ text: '', type: '' });
	// const [isGetCourseApiLoading, setIsGetCourseApiLoading] = useState(true);
	const [allshares, setAllshares] = useState([]);
	const [shareCount, setShareCount] = useState(0);
	// const currentBalance = localStorage.getItem('current_balance') || 10000;

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

	useEffect(() => {
		const userId = JSON.parse(localStorage.getItem('user_details'))?.userId;
		if (userId)
			apiCall('get_all/?id=' + userId).then((response) => {
				console.log(response);
				setAllshares(response.data?.referralDetails);
				setShareCount(response.data?.referralCount);
			});
	}, []);
	console.log(allshares);
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

			{/* <div className="homePageCurrentBalance">
				Your Current Balance: <span>₹{currentBalance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</span>
			</div> */}

			{/* <Loader isLoading={isGetCourseApiLoading} sx={{ marginTop: '20px' }} /> */}
			<EnrolledCourses />

			<div className="homePageCoursesTitle">
				All Shares: {shareCount}
				<div className="titleBorder"></div>
			</div>

			{allshares && (
				<div className="allShares">
					{allshares?.map((item, index) => {
						return (
							<div className="shareBox" key={index}>
								<div className="shareDetailSection">
									<div className="shareTitle">Name: {item?.userName}</div>
								</div>
							</div>
						);
					})}
				</div>
			)}

			{/* {msg && <ShowMsg isError={msg?.text ? true : false} msgText={msg?.text} type={msg?.type} />} */}
		</div>
	);
}

export default HomePage;
