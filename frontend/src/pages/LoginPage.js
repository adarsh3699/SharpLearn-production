import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { handleUserState, handleLoginForm, handleSignUpForm } from '../services/auth';
import Loader from '../components/Loader/Loader';

import { Toolbar } from '@mui/material';

import '../styles/loginPage.css';

function LoginPage() {
	const [msg, setMsg] = useState('');
	const [isLoading, setIsLoading] = useState(true);
	const [isApiLoading, setIsApiLoading] = useState(false);
	const [ispasswordVisible, setIspasswordVisible] = useState(false);
	const [isSignupWapper, setIsSignupWapper] = useState(false);
	let [searchParams, setSearchParams] = useSearchParams();

	useEffect(() => {
		handleUserState('loginPage', setIsLoading);
		// if (JSON.parse(localStorage.getItem('user_details'))) {
		// 	document.location.href = '/';
		// } else {
		// 	setIsLoading(false);
		// }
	}, []);

	const handlePasswordVisibility = useCallback(() => {
		setIspasswordVisible(!ispasswordVisible);
	}, [ispasswordVisible]);

	const handleUserLogin = useCallback((e) => {
		handleLoginForm(e, setMsg, setIsApiLoading);
	}, []);

	const handleUserSignUpForm = useCallback(
		(e) => {
			const referralCode = searchParams.get('referral');
			handleSignUpForm(e, setMsg, setIsApiLoading, referralCode);
		},
		[searchParams]
	);

	const handleMsgHideOnKeyUp = useCallback((e) => {
		setMsg('');
	}, []);

	return (
		<>
			<Toolbar />
			{!isLoading ? (
				<div className="loginPage">
					<div
						className="loginWapper mobileForm"
						style={isSignupWapper ? { transform: 'rotateY(180deg)' } : null}
					>
						<form className="loginForm" onSubmit={handleUserLogin}>
							<div className="loginWapperTitle">Login Here</div>
							<input
								type="email"
								name="email"
								placeholder="Email"
								disabled={isApiLoading}
								required
								className="autoInput"
								onKeyDown={handleMsgHideOnKeyUp}
							/>
							<input
								type={ispasswordVisible ? 'text' : 'password'}
								name="password"
								placeholder="Password"
								disabled={isApiLoading}
								required
								className="autoInput"
								onKeyDown={handleMsgHideOnKeyUp}
							/>
							<div className="showPassContainer">
								<input id="showPass" type="checkbox" onClick={handlePasswordVisibility} />
								<label htmlFor="showPass">Show password</label>
							</div>
							<div className="authMSG">{msg}</div>
							<button
								className={isApiLoading ? 'loginBtnLoading loginBtn' : 'loginBtn'}
								disabled={isApiLoading}
							>
								Login
							</button>

							<div className="signupdesc">Don't have an account</div>
							<div className="createAccbtn" onClick={() => setIsSignupWapper(true)}>
								Sign up here
							</div>
						</form>
						<form className="signupForm" onSubmit={handleUserSignUpForm}>
							<div className="loginWapperTitle">Sign Up Here</div>
							<input
								type="text"
								name="userName"
								placeholder="Full Name"
								disabled={isApiLoading}
								required
								className="autoInput"
								onKeyDown={handleMsgHideOnKeyUp}
							/>
							<input
								type="email"
								name="email"
								placeholder="Email"
								disabled={isApiLoading}
								required
								className="autoInput"
								onKeyDown={handleMsgHideOnKeyUp}
							/>
							<input
								type={ispasswordVisible ? 'text' : 'password'}
								name="password"
								placeholder="Password (8 digit)"
								disabled={isApiLoading}
								required
								className="autoInput"
								onKeyDown={handleMsgHideOnKeyUp}
							/>
							<input
								type={ispasswordVisible ? 'text' : 'password'}
								name="confPassword"
								placeholder="Confirm Password (8 digit)"
								disabled={isApiLoading}
								required
								className="autoInput"
								onKeyDown={handleMsgHideOnKeyUp}
							/>
							<div className="authMSG">{msg}</div>
							<button
								className={isApiLoading ? 'loginBtnLoading loginBtn' : 'loginBtn'}
								disabled={isApiLoading}
							>
								Sign Up
							</button>
							<div className="signupdesc">Already have an Account</div>
							<div className="createAccbtn" onClick={() => setIsSignupWapper(false)}>
								Login here
							</div>
						</form>
					</div>
					<div className="loginPageIntro">
						<div className="text1">WelCome To</div>
						<div className="text2">Employee SharpLearn</div>
						<div className="text3">platform</div>
						<p className="text4">
							A comprehensive program that covers the fundamentals of Low Level to high level design &
							program.
							<br /> It includes lectures and practices to help the employees develop and provide them
							efficient solutions.
							<br /> This platform is suitable for beginners as well as experienced employees
							<br /> that aims to skill up their expertise.
						</p>
					</div>
					<div className="loginWapper" style={isSignupWapper ? { transform: 'rotateY(180deg)' } : null}>
						<form className="loginForm" onSubmit={handleUserLogin}>
							<div className="loginWapperTitle">Login Here</div>
							<input
								type="email"
								name="email"
								placeholder="Email"
								disabled={isApiLoading}
								required
								className="autoInput"
								onKeyDown={handleMsgHideOnKeyUp}
							/>
							<input
								type={ispasswordVisible ? 'text' : 'password'}
								name="password"
								placeholder="Password"
								disabled={isApiLoading}
								required
								className="autoInput"
								onKeyDown={handleMsgHideOnKeyUp}
							/>
							<div className="showPassContainer">
								<input id="showPass2" type="checkbox" onClick={handlePasswordVisibility} />
								<label htmlFor="showPass2">Show password</label>
							</div>
							<div className="authMSG">{msg}</div>
							<button
								className={isApiLoading ? 'loginBtnLoading loginBtn' : 'loginBtn'}
								disabled={isApiLoading}
							>
								Login
							</button>

							<div className="signupdesc">Don't have an account</div>
							<div className="createAccbtn" onClick={() => setIsSignupWapper(true)}>
								Sign up here
							</div>
						</form>
						<form className="signupForm" onSubmit={handleUserSignUpForm}>
							<div className="loginWapperTitle">Sign Up Here</div>
							<input
								type="text"
								name="userName"
								placeholder="Full Name"
								disabled={isApiLoading}
								required
								className="autoInput"
								onKeyDown={handleMsgHideOnKeyUp}
							/>
							<input
								type="email"
								name="email"
								placeholder="Email"
								disabled={isApiLoading}
								required
								className="autoInput"
								onKeyDown={handleMsgHideOnKeyUp}
							/>
							<input
								type={ispasswordVisible ? 'text' : 'password'}
								name="password"
								placeholder="Password (8 digit)"
								disabled={isApiLoading}
								required
								className="autoInput"
								onKeyDown={handleMsgHideOnKeyUp}
							/>
							<input
								type={ispasswordVisible ? 'text' : 'password'}
								name="confPassword"
								placeholder="Confirm Password (8 digit)"
								disabled={isApiLoading}
								required
								className="autoInput"
								onKeyDown={handleMsgHideOnKeyUp}
							/>
							<div className="authMSG">{msg}</div>
							<button
								className={isApiLoading ? 'loginBtnLoading loginBtn' : 'loginBtn'}
								disabled={isApiLoading}
							>
								Sign Up
							</button>
							<div className="signupdesc">Already have an Account</div>
							<div className="createAccbtn" onClick={() => setIsSignupWapper(false)}>
								Login here
							</div>
						</form>
					</div>
				</div>
			) : (
				<div className="background">
					<div id="loadingScreen">
						<div> Loading </div>
						<Loader isLoading={true} />
					</div>
				</div>
			)}
		</>
	);
}

export default LoginPage;
