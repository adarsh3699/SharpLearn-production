import React from 'react';
import { NavLink } from 'react-router-dom';
import { handleSignOut } from '../../../firebase/auth';

import logoImg from '../../../images/logoSizeM.png';
// import googleImg from './img/google.png';
// import youtubeImg from './img/youtubeWhite.svg';

import './footer.css';

function FootBar() {
	return (
		<div id="bottomBar">
			<div className="pcFooter">
				<div className="footerLeftSection">
					<div className="footerCoursesTitle">Courses</div>
					<NavLink to="/">Course 1</NavLink>
					<NavLink to="/">Course 2</NavLink>
					<NavLink to="/">Course 3</NavLink>
				</div>

				<div className="footerMiddleSection">
					<div className="footerPageNavigation">
						<NavLink to="/">Home</NavLink>
						<NavLink to="/about">About</NavLink>
						<NavLink to="/contact">Contact</NavLink>
						<NavLink to="/cart">Cart</NavLink>
						<NavLink to="/login" onClick={handleSignOut}>
							Logout
						</NavLink>
					</div>
					<div className="footerLogoContainer">
						<img className="footerLogo" src={logoImg} alt="" />
						<div>© 2022-25 (V 1.0)</div>
						<div>Developed by SharpLearn Team</div>
					</div>
				</div>

				<div className="footerRightSection">
					<div className="footerSocialTitle">Social</div>
					<a href="mailto:sharplearn0@gmail.com' target='_blank' rel='noreferrer">@sharplearn</a>
					<a href="https://www.youtube.com/channel/UC9jZsQkYm4xXQlB2gXnYQjw" target="_blank" rel="noreferrer">
						YouTube
					</a>
					<a href="https://www.instagram.com/sharplearn0/" target="_blank" rel="noreferrer">
						Instagram
					</a>
				</div>
			</div>
			<div className="footerBottomSectionPh">
				<div className="footerPageNavigation">
					<NavLink to="/">Home</NavLink>
					<NavLink to="/about">About</NavLink>
					<NavLink to="/contact">Contact</NavLink>
					<NavLink to="/cart">Cart</NavLink>
					<NavLink to="/login" onClick={handleSignOut}>
						Logout
					</NavLink>
				</div>
				<div className="footerLogoContainer">
					<img className="footerLogo" src={logoImg} alt="" />
					<div>© 2022-25 (V 1.0)</div>
					<div>Developed by SharpLearn Team</div>
				</div>
			</div>
		</div>
	);
}

export default FootBar;
