import React, { useState, useEffect, useCallback } from 'react';
import { handleUserState, handleLoginForm, handleSignUpForm } from '../firebase/auth';
import Loader from '../components/Loader/Loader';

import { Toolbar } from '@mui/material';

import '../styles/loginPage.css';

function LoginPage() {
	const [msg, setMsg] = useState('');
	const [isLoading, setIsLoading] = useState(true);
	const [isApiLoading, setIsApiLoading] = useState(false);
	const [ispasswordVisible, setIspasswordVisible] = useState(false);
	const [isSignupWapper, setIsSignupWapper] = useState(false);

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

	const handleUserSignUpForm = useCallback((e) => {
		handleSignUpForm(e, setMsg, setIsApiLoading);
	}, []);

	const handleMsgHideOnKeyUp = useCallback((e) => {
		setMsg('');
	}, []);

	return (
		<>
			<Toolbar />
			{!isLoading ? (
				<div className="loginPage">
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
					{/* <div id="wrapper">
						<img id="myLogo" src={logologoSizeL} alt="" />
						<div id="Title">SharpLearn</div>
						<form className="form" onSubmit={handleUserLogin}>
							<input
								type="email"
								name="email"
								placeholder="Email"
								disabled={isApiLoading}
								className="inputBottomMargin"
								onKeyDown={handleMsgHideOnKeyUp}
							/>
							<input
								type={ispasswordVisible ? 'text' : 'password'}
								name="password"
								placeholder="Password"
								disabled={isApiLoading}
								className=""
								onKeyDown={handleMsgHideOnKeyUp}
							/>

							<div id="showPassword">
								<FormControlLabel
									control={
										<Checkbox
											onClick={handlePasswordVisibility}
											sx={{
												color: amber[400],
												'&.Mui-checked': {
													color: amber[600],
												},
											}}
										/>
									}
									label="Show password"
								/>
							</div>

							<button id="login" className={isApiLoading ? 'isLogin' : ''}>
								Login
							</button>
						</form>

						<div id="msg" className="red" style={isApiLoading ? { marginBottom: '0px' } : {}}>
							{' '}
							{msg}{' '}
						</div>
						<Loader isLoading={isApiLoading} />
						<NavLink to="/forget-password" id="forgotPass">
							Forgotten Password
						</NavLink>

						<hr />
						<NavLink to="/register">
							<div id="createAcc">Create New Account</div>
						</NavLink>
					</div> */}
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
