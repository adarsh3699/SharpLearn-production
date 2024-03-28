import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';

import './enrolledCourses.css';

import Button from '@mui/material/Button';
import photoNotAvailable from '../../images/photoNotAvailable.jpeg';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import homePageSkeleton from '../../images/homePageSkeleton.svg';

function EnrolledCourses() {
	const [enrolled_courses, setEnrolled_courses] = useState(
		JSON.parse(localStorage.getItem('enrolled_courses')) || []
	);

	const handleMarkAsCompletedBtn = useCallback(
		(courseId) => {
			const temp = enrolled_courses.map((item) => {
				if (item.courseId === courseId) {
					item.isCompleated = true;
				}
				return item;
			});
			localStorage.setItem('enrolled_courses', JSON.stringify(temp));
			setEnrolled_courses(temp);
		},
		[enrolled_courses]
	);

	const handleCourseClick = useCallback((courseId) => {
		window.location = `/course/${courseId}`;
	}, []);

	return (
		<div name="enrolledCourseSection">
			<div className="homePageCoursesTitle">
				Course Enrolled<div className="titleBorder"></div>
			</div>
			{enrolled_courses.map((item, index) => {
				return (
					<div className="enrolledCourseBox" key={index}>
						<img
							className="enrolledCourseImg"
							src={item?.courseThumbnail || photoNotAvailable}
							loading="lazy"
							onClick={() => handleCourseClick(item?.courseId)}
							alt=""
						/>
						<div className="enrolledCourseDetailSection">
							<div className="enrolledCourseTitle" onClick={() => handleCourseClick(item?.courseId)}>
								{item?.courseName}
							</div>
							<div className="enrolledCourseType">By {item?.courseType}</div>
							<div className="enrolledAboutCourse">{item?.aboutCourse}</div>
							<LinearProgressWithLabel value={item?.isCompleated ? 100 : Math.random() * 100} />

							<Button
								variant="contained"
								color="primary"
								onClick={() => handleMarkAsCompletedBtn(item?.courseId)}
								sx={{ marginTop: '10px' }}
							>
								{item?.isCompleated ? 'Completed' : 'Mark as Completed'}
							</Button>
						</div>
					</div>
				);
			})}
			{enrolled_courses.length === 0 && (
				<div className="noCourseEnrolled">
					<img src={homePageSkeleton} alt="homePageSkeleton" className="homePageSkeleton" />
					<div className="noCourseEnrolledText">No Course Enrolled Yet.</div>
				</div>
			)}
		</div>
	);
}

function LinearProgressWithLabel(props) {
	return (
		<Box sx={{ display: 'flex', alignItems: 'center', mt: 10 }}>
			<Box sx={{ width: '100%', mr: 1 }}>
				<LinearProgress variant="determinate" {...props} />
			</Box>
			<Box sx={{ minWidth: 35 }}>
				<Typography variant="body2" color="text.secondary">{`${Math.round(props.value)}%`}</Typography>
			</Box>
		</Box>
	);
}

LinearProgressWithLabel.propTypes = {
	/**
	 * The value of the progress indicator for the determinate and buffer variants.
	 * Value between 0 and 100.
	 */
	value: PropTypes.number.isRequired,
};

export default EnrolledCourses;
