import React, { useState, useEffect, useCallback } from 'react';
import { NavLink } from 'react-router-dom';

// import photoNotAvailable from '../images/photoNotAvailable.jpeg';
import arrow from '../../images/arrow.svg';

import './coursesSlider.css';

function CoursesSlider({ allCourses }) {
	const handleCourseClick = useCallback((courseId) => {
		console.log(courseId);
		window.open(`/course/${courseId}`, '_blank');
		// window.location = `/course/${courseId}`;
	}, []);
	return (
		<div className="coursesSlider">
			{allCourses.map((item, index) => (
				<div className="sliderCourseItem" key={index} onClick={() => handleCourseClick(item?.courseId)}>
					<img src={item?.courseThumbnail} className="sliderCourseItemImg" alt="" />
					<div className="sliderCourseDetailBox">
						<div className="sliderItemCourseType">{item?.courseType}</div>
						<div className="sliderItemCourseTitle">{item?.courseName}</div>
						<div className="sliderItemCoursePriceBox">
							<div className="sliderItemCoursesPrice">₹{item?.courseDiscountedPrice},</div>
							<div className="sliderItemCoursesOrgPrice">₹{item?.courseORGPrice}</div>
						</div>
					</div>
				</div>
			))}
			<NavLink to='/All_Courses' className="sliderCourseItem">
				<div className="sliderCourseItemImg videOtherCourses">View All</div>
				<div className="sliderCourseDetailBox">
					<div className="sliderItemCourseType">Other</div>
					<div className="sliderItemCourseTitle">View other courses</div>
					<div className="sliderItemCoursePriceBox">
						<div>More</div>
						<img src={arrow} alt="" />
					</div>
				</div>
			</NavLink>
		</div>
	);
}

export default CoursesSlider;
