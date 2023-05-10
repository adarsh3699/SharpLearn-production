import React, { useState, useEffect, useCallback } from 'react';
import { NavLink } from 'react-router-dom';

import { getcourses } from '../firebase/homePage.js';
import Loader from '../components/Loader/Loader.js';
import ShowMsg from '../components/ShowMsg/ShowMsg.js';
import MuiBtn from '../components/MuiBtn/MuiBtn.js';

import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import DoneIcon from '@mui/icons-material/Done';

import photoNotAvailable from '../images/photoNotAvailable.jpeg';
import arrow from '../images/arrow.svg';
import viewImg from '../images/view.png';

import '../styles/courseDetailsPage.css';

const keyPoints = [
    { title: 'Self-Paced', description: 'Watch Anytime, Anywhere Unlimited Video Playbacks for lifetime.' },
    { title: 'Unlimited', description: ' Lifetime access of course.' },
    { title: 'Language', description: 'Indian English and Hindi.' },
    { title: 'Support', description: '24/7 Student support line.' },
];

function HomePage() {
    const [msg, setMsg] = useState({ text: '', type: '' });
    const [isGetCourseApiLoading, setIsGetCourseApiLoading] = useState(false);
    const [allCourses, setAllCourses] = useState([]);

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
        getcourses(setAllCourses, setIsGetCourseApiLoading, handleMsgShown);
    }, [handleMsgShown]);

    // const handleAddToCartBtnClick = useCallback(
    // 	(courseId) => {
    // 		const userCart = JSON.parse(localStorage.getItem('user_cart')) || [];
    // 		if (!userCart.includes(courseId)) {
    // 			userCart.push(courseId);
    // 			localStorage.setItem('user_cart', JSON.stringify(userCart));
    // 			handleMsgShown('Course Added to Cart', 'success');
    // 		} else {
    // 			handleMsgShown('Course Already in Cart', 'warning');
    // 		}
    // 	},
    // 	[handleMsgShown]
    // );

    const handleCourseClick = useCallback((courseId) => {
        console.log(courseId);
        window.open(`/courses/${courseId}`, '_blank');
        // window.location = `/courses/${courseId}`;
    }, []);

    return (
        <div className="courseDetailsPage">
            <Toolbar />
            Course Page

            {msg && <ShowMsg isError={msg?.text ? true : false} msgText={msg?.text} type={msg?.type} />}
        </div>
    );
}

export default HomePage;
