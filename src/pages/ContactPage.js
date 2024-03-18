import React, { useState } from 'react';
import Button from '@mui/material/Button';

import '../styles/contactPage.css';

import emailIconImg from '../images/soical_logos/email.svg';
import telegramIconImg from '../images/soical_logos/telegram.svg';
import instaIconImg from '../images/soical_logos/instagram.svg';
import linkedinLogoImg from '../images/soical_logos/linkedinLogo.svg';
import youtubeIconImg from '../images/soical_logos/youtube.svg';

document.title = 'Adarsh Suman | Contact';

function AboutPage() {
	const [emailValue, setEmailValue] = useState('');
	const [msgValue, setMsgValue] = useState('');

	if (document.title !== 'Adarsh Suman | Contact') document.title = 'Adarsh Suman | Contact';

	function handelEmailChange(e) {
		const value = e.target.value;
		setEmailValue(value);
	}

	function handelMsgChange(e) {
		const value = e.target.value;
		setMsgValue(value);
	}

	return (
		<div className="background">
			<div id="title">Contact Me</div>
			<form id="msgUs" method="post" action="https://send.pageclip.co/YYFiRgfPYOw99mcNfB9R8RHgiwcappSO">
				<div>
					<input
						type="email"
						placeholder=" Enter Your Email"
						required
						name="email"
						id="email"
						value={emailValue}
						onChange={handelEmailChange}
					/>
				</div>

				<div>
					<textarea
						id="textArea"
						required
						name="body"
						placeholder="Write your msg here"
						value={msgValue}
						onChange={handelMsgChange}
					></textarea>
				</div>
				<Button
					variant="contained"
					type="submit"
					sx={{
						marginBottom: '10px',
						width: '150px',
						height: '40px',
						fontSize: '18px',
						color: 'black',
					}}
				>
					Send
				</Button>
			</form>

			<div id="contact">
				<div className="subTitle">Contact On </div>
				<div>
					<a href="mailto:adarsh3699@gmail.com" className="socialLinksBox">
						<img src={emailIconImg} alt="" />
						<div>adarsh3699@gmail.com</div>
					</a>
				</div>
				<div>
					<a href="mailto:bhemu369@gmail.com" className="socialLinksBox">
						<img src={emailIconImg} alt="" />
						<div>bhemu369@gmail.com</div>
					</a>
				</div>
				<div>
					<a href="https://t.me/adarsh3699" target="_blank" className="socialLinksBox" rel="noreferrer">
						<img src={telegramIconImg} height="40px" alt="" />
						<div>Telegram</div>
					</a>
				</div>
				<div className="subTitle">Follow Me</div>
				<div>
					<a
						href="https://www.instagram.com/_adarsh.s/"
						target="_blank"
						className="socialLinksBox"
						rel="noreferrer"
					>
						<img style={{ borderRadius: '50%' }} src={linkedinLogoImg} alt="" />
						<div>LinkedIn</div>
					</a>
				</div>
				<div>
					<a
						href="https://www.instagram.com/_adarsh.s/"
						target="_blank"
						className="socialLinksBox"
						rel="noreferrer"
					>
						<img style={{ borderRadius: '50%' }} src={instaIconImg} alt="" />
						<div>Instagram</div>
					</a>
				</div>
				<div>
					<a
						href="https://www.youtube.com/@gamingWithBhemu/"
						target="_blank"
						className="socialLinksBox"
						rel="noreferrer"
					>
						<img src={youtubeIconImg} alt="" />
						<div>YouTube</div>
					</a>
				</div>
				<div>
					<a href="https://github.com/adarsh3699" target="_blank" className="socialLinksBox" rel="noreferrer">
						<svg height="30" viewBox="0 0 16 16" version="1.1" id="git">
							<path
								fillRule="evenodd"
								d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
							></path>
						</svg>
						<div>GitHub</div>
					</a>
				</div>
			</div>
		</div>
	);
}

export default AboutPage;
