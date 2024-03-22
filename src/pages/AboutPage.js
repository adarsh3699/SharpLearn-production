import React from 'react';
import Toolbar from '@mui/material/Toolbar';

import '../styles/aboutPage.css';

function AboutPage() {
	return (
		<div className="aboutPage">
			<Toolbar />
			<p className="aboutPara">
				Employee skill hub platform is a digital tool or system designed to facilitate the learning and
				development of employees within an organization. The hub is a comprehensive program that covers the
				fundamentals of low level to high level design. The platform is suitable for beginners as well as
				experienced employees.
			</p>

			<p className="aboutPara">
				Our platform offers a range of features such as online courses, training modules, and tracking
				mechanisms to help employees acquire new skills, enhance existing ones, and stay up-to-date with
				industry trends. It provides personalized learning paths tailored to individual needs and organizational
				goals.
			</p>

			<p className="aboutPara">
				Additionally, it also incorporate features for collaboration, feedback, and performance evaluation to
				support continuous growth and development. Our platform offers several courses for web development such
				as html ,css , javascript and many more for the employees advancement as it encompass a broad range of
				abilities crucial for professional growth and career progression.
				<br /> The platform facilitates continuous development, with feedback mechanisms enabling employees to
				track their progress effectively. It also enhance the potential for career advancement while fostering
				higher levels of engagement and job satisfaction. Ultimately, empowering employees to take charge of
				their professional growth and contribute positively to a culture of learning within the organization.
			</p>
			<p className="aboutPara">
				The platform facilitates continuous development, with feedback mechanisms enabling employees to track
				their progress effectively. It also enhance the potential for career advancement while fostering higher
				levels of engagement and job satisfaction. Ultimately, empowering employees to take charge of their
				professional growth and contribute positively to a culture of learning within the organization.
			</p>
			<p className="aboutPara">
				The hub offers a simple mechanism to log in and sign up for the first time users with our two factor
				authentication ensuring proper security. The user can take up any course as per their needs and buy them
				through the cart option mentioned above which will help them to grow as well as enhance their
				professional life.
			</p>
			<p className="aboutPara">Enjoy a wide range of courses with our Employee Skill Hub.</p>
		</div>
	);
}

export default AboutPage;
