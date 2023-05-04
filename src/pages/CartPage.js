import React, { useEffect, useCallback, useState } from 'react';

import { getAllCartItems } from '../firebase/cartPage'

import NavBar from '../components/Bar/NavBar/NavBar.js';
import FootBar from '../components/Bar/Footer/FootBar.js';
import Loader from '../components/Loader/Loader.js';
import MuiBtn from '../components/MuiBtn/MuiBtn.js';

import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';

import photoNotAvailable from '../images/photoNotAvailable.jpeg';

import '../styles/cartPage.css';

function HomePage() {
	const [msg, setMsg] = useState({ text: '', type: '' });
	const [isGetCourseApiLoading, setIsGetCourseApiLoading] = useState(false);
	const [allCartCourses, setAllCartCourses] = useState([]);
	const [coursePrices, setcoursePrices] = useState({ courseORGPrice: 0, courseDiscountedPrice: 0 });

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
		getAllCartItems(setAllCartCourses, setIsGetCourseApiLoading, handleMsgShown);
	}, [handleMsgShown]);

	// useEffect(() => {

	// 	const coursePrice = allCartCourses.map((item) => {
	// 		// console.log(parseInt(item.courseDiscountedPrice) + parseInt(item.courseDiscountedPrice));
	// 		// return (ka = ka + parseInt(item.courseDiscountedPrice))
	// 		return (setcoursePrices({ courseDiscountedPrice: (parseInt(item.courseDiscountedPrice) + coursePrices.courseDiscountedPrice), courseORGPrice: (parseInt(item.courseORGPrice) + coursePrices.courseORGPrice) }))
	// 	})
	// 	console.log(coursePrice);

	// }, [allCartCourses, coursePrices]);

	const handleRemoveBtnClick = useCallback((courseId) => {
		const userCart = JSON.parse(localStorage.getItem('user_cart')) || [];
		var filteredArray = userCart.filter(function (e) { return e !== courseId })
		localStorage.setItem('user_cart', JSON.stringify(filteredArray));
		window.location.reload()
	}, []);
	return (
		<div className="cartPage">
			<NavBar />
			<Toolbar />
			<div className="cartPageContainer" component="main">
				<div className='shoppingCartContainer'>
					<div className='shoppingCartTitle'>Shopping Cart</div>

					{allCartCourses.map((item, index) => {
						return (
							<div className="cartCourseBox" key={index}>
								<img
									className="cartCourseImg"
									src={item?.courseThumbnail || photoNotAvailable}
									loading="lazy"
									alt=""
								/>
								<div className="cartCourseInfo">
									<div className='cartCourseType'>Type:- {item?.courseType}</div>
									<div className="cartCourseTitle">{item?.courseName}</div>
									<div className="cartCoursePrice">₹{item?.courseDiscountedPrice}</div>
									<Button onClick={() => handleRemoveBtnClick(item?.courseId)}>
										Remove
									</Button>

								</div>
							</div>
						);
					})}
				</div>

				<div className='cartPriceSum'>
					<div className='cartPriceSumTitle'>Price Details</div>
					<div className='cartPriceDetails'>
						<div className='cartPriceDetailsName'>Price</div>
						<div className='cartPriceDetailsValue'>₹0</div>
					</div>
					<div className='cartPriceDetails'>
						<div className='cartPriceDetailsName'>Discount</div>
						<div className='cartPriceDetailsValue'>- ₹0</div>
					</div>
					<hr />
					<div className='cartPriceDetails'>
						<div className='cartPriceDetailsName'>Total Amount</div>
						<div className='cartPriceDetailsValue'>₹0</div>
					</div>
				</div>
			</div>
			<FootBar />
		</div>
	);
}

export default HomePage;
