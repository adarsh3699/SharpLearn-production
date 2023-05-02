import React from 'react';
import ReactDOM from 'react-dom/client';
import Routes from './routes';
import { BrowserRouter } from 'react-router-dom';
import { app } from './firebase/initFirebase';

import './styles/index.css';

import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
	palette: {
		mode: 'dark',
	},
	breakpoints: {
		values: {
			xs: 0,
			sm: 700,
			md: 900,
			lg: 1200,
			xl: 1536,
		},
	},
});

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
// 	apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
// 	authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
// 	databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
// 	projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
// 	storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUSKET,
// 	messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
// 	appId: process.env.REACT_APP_FIREBASE_APP_ID,
// 	measurementId: process.env.REACT_APP_FIREBASE_MEASURMENT_ID,
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// getAnalytics(app);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<BrowserRouter>
			<ThemeProvider theme={theme}>
				<Routes />
			</ThemeProvider>
		</BrowserRouter>
	</React.StrictMode>
);
