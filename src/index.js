import React from 'react';
import ReactDOM from 'react-dom/client';
import Routes from './routes';
import { BrowserRouter } from 'react-router-dom';
import './firebase/initFirebase';

import NavBar from './components/Bar/NavBar/NavBar';
import FootBar from './components/Bar/Footer/FootBar';

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

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<BrowserRouter>
			<ThemeProvider theme={theme}>
				<NavBar />
				<Routes />
				<FootBar />
			</ThemeProvider>
		</BrowserRouter>
	</React.StrictMode>
);
