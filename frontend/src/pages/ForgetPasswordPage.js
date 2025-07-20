import React, { useState, useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import { handleForgetPassword } from '../services/auth';
import Loader from '../components/Loader/Loader';
import { Toolbar } from '@mui/material';

import '../styles/loginPage.css';

document.title = 'Bhemu Notes | Forget Password';

function ForgetPasswordPage() {
	const [msg, setMsg] = useState('');
	const [isOTPApiLoading, setIsOTPApiLoading] = useState(false);

	const handleForgetPasswordSubmit = useCallback((e) => {
		setIsOTPApiLoading(true);
		handleForgetPassword(e, setMsg, setIsOTPApiLoading);
	}, []);

	const handleMsgHideOnKeyUp = useCallback((e) => {
		setMsg('');
	}, []);

	return (
		<div className="ForgetPasswordPage">
			<Toolbar />
			<div className="wrapper">
				<div className="loginWapperTitle">Forget Password</div>
				<form className="form" onSubmit={handleForgetPasswordSubmit}>
					<input
						type="email"
						name="email"
						className="autoInput"
						placeholder="Email"
						required
						onChange={handleMsgHideOnKeyUp}
					/>

					<button className="loginBtn" style={{ marginTop: 'unset' }}>
						Send Link
					</button>

					<div className="red">{msg}</div>
					<Loader isLoading={isOTPApiLoading} />
					<br />
				</form>

				<NavLink to="/" className="createAccbtn">
					Back to Login Page
				</NavLink>
			</div>
		</div>
	);
}

export default ForgetPasswordPage;
