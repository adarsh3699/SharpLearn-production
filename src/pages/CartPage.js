import React from 'react';

import NavBar from '../components/Bar/NavBar/NavBar.js';
import FootBar from '../components/Bar/Footer/FootBar.js';

import Toolbar from '@mui/material/Toolbar';


import '../styles/homePage.css';

function HomePage() {

    return (
        <div className='cartPage'>
            <NavBar />
            <div className='homePageContainer' component="main">
                <Toolbar />
                Cart Page
            </div>
            <FootBar />
        </div>
    );
}

export default HomePage;
