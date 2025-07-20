import React, { useEffect, useCallback, useState } from 'react';

import { getAllCartItems, removeFromCart, purchaseCartItems } from '../services/cart';
import { handleCurentBalance } from '../utils';

import Loader from '../components/Loader/Loader.js';
import ShowMsg from '../components/ShowMsg/ShowMsg';

import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import VerifiedUserTwoToneIcon from '@mui/icons-material/VerifiedUserTwoTone';

import photoNotAvailable from '../images/photoNotAvailable.jpeg';
import cartIsEmpty from '../images/cart-is-empty.png';

import '../styles/cartPage.css';

function CartPage() {
	const [msg, setMsg] = useState({ text: '', type: '' });
	const [isGetCourseApiLoading, setIsGetCourseApiLoading] = useState(true);
	const [allCartCourses, setAllCartCourses] = useState([]);
	const [totalCoursePrices, setTotalCoursePrices] = useState({ courseORGPrice: 0, courseDiscountedPrice: 0 });
	const [isPurchaseLoading, setIsPurchaseLoading] = useState(false);
	const [currentBalance, setCurrentBalance] = useState(parseInt(localStorage.getItem('current_balance')) || 10000);

	const handleMsgShown = useCallback((msgText, type) => {
		if (msgText) {
			setMsg({ text: msgText, type: type });
			setTimeout(() => {
				setMsg({ text: '', type: '' });
			}, 2500);
		}
	}, []);

	// Load cart items
	useEffect(() => {
		getAllCartItems(setAllCartCourses, setIsGetCourseApiLoading, handleMsgShown);
	}, [handleMsgShown]);

	// Calculate total prices
	useEffect(() => {
		let cartPriceSum = { courseORGPrice: 0, courseDiscountedPrice: 0 };
		for (var i = 0; i < allCartCourses.length; i++) {
			cartPriceSum.courseORGPrice = cartPriceSum.courseORGPrice + parseInt(allCartCourses[i].courseORGPrice);
			cartPriceSum.courseDiscountedPrice =
				cartPriceSum.courseDiscountedPrice + parseInt(allCartCourses[i].courseDiscountedPrice);
		}
		setTotalCoursePrices(cartPriceSum);
	}, [allCartCourses]);

	const handleRemoveBtnClick = useCallback(
		(courseId) => {
			removeFromCart(courseId, handleMsgShown)
				.then(() => {
					// Reload cart items after successful removal
					getAllCartItems(setAllCartCourses, setIsGetCourseApiLoading, handleMsgShown);
				})
				.catch((error) => {
					console.error('Error removing item from cart:', error);
				});
		},
		[handleMsgShown]
	);

	const handleOrderPlaceBtnClick = useCallback(() => {
		if (allCartCourses.length === 0) {
			handleMsgShown('Your cart is empty', 'warning');
			return;
		}

		if (currentBalance < totalCoursePrices.courseDiscountedPrice) {
			handleMsgShown('Insufficient balance to complete purchase', 'error');
			return;
		}

		setIsPurchaseLoading(true);

		purchaseCartItems(handleMsgShown, (response) => {
			// Update local balance
			setCurrentBalance(response.newBalance);
			// Reload cart (should be empty now)
			getAllCartItems(setAllCartCourses, setIsGetCourseApiLoading, handleMsgShown);
			// Redirect to home page after successful purchase
			setTimeout(() => {
				window.location.href = '/';
			}, 2000);
		}).finally(() => {
			setIsPurchaseLoading(false);
		});
	}, [allCartCourses, totalCoursePrices, currentBalance, handleMsgShown]);

	const handleCourseClick = useCallback((courseId) => {
		window.location = `/course/${courseId}`;
	}, []);

	return (
		<div className="cartPage">
			<Toolbar />
			<div className="cartPageContainer" component="main">
				<div className="leftContainer">
					<div className="shoppingCartTitle">Shopping Cart</div>

					<Loader isLoading={isGetCourseApiLoading} />

					{allCartCourses.length === 0 && !isGetCourseApiLoading && (
						<div className="cartIsEmpty">
							<img src={cartIsEmpty} alt="" />
							<div>Your is cart currently empty.</div>
						</div>
					)}

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
									<div className="cartCourseType">Type:- {item?.courseType}</div>
									<div className="cartCourseTitle">{item?.courseName}</div>
									<div className="cartCoursePrice">₹{item?.courseDiscountedPrice}</div>
									<Button onClick={() => handleRemoveBtnClick(item?.courseId)}>Remove</Button>
								</div>
							</div>
						);
					})}
				</div>
				<div className="rightContainer">
					<div className="cartPriceSum">
						<div className="cartPriceSumTitle">Price Details</div>
						<div className="cartPriceDetails">
							<div className="cartPriceDetailsName">Price</div>
							<div className="cartPriceDetailsValue">₹{totalCoursePrices?.courseORGPrice}</div>
						</div>
						<div className="cartPriceDetails">
							<div className="cartPriceDetailsName">Discount</div>
							<div className="cartPriceDetailsValue cartDiscountPriceValue">
								- ₹{totalCoursePrices?.courseORGPrice - totalCoursePrices?.courseDiscountedPrice}
							</div>
						</div>
						<hr className="totalPriceLine" />
						<div className="cartPriceDetails cartTotalPrice">
							<div className="cartPriceDetailsName">Total Amount</div>
							<div className="cartPriceDetailsValue">₹{totalCoursePrices?.courseDiscountedPrice}</div>
						</div>
					</div>
					<div className="VerifiedPaymet">
						<VerifiedUserTwoToneIcon sx={{ mr: 1 }} />
						<>Safe and Secure Payments. 100% Authentic products.</>
					</div>

					<Button
						variant="contained"
						className="cartCheckoutBtn"
						color="warning"
						sx={{ my: 3, px: 3, py: 1.5 }}
						fullWidth
						onClick={handleOrderPlaceBtnClick}
						disabled={isPurchaseLoading}
					>
						{isPurchaseLoading ? 'Processing...' : 'Place Order'}
					</Button>
				</div>
			</div>
			{msg && <ShowMsg isError={msg?.text ? true : false} msgText={msg?.text} type={msg?.type} />}
		</div>
	);
}

export default CartPage;
