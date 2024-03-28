import React, { Suspense, lazy } from 'react';
import { Routes as Switch, Route } from 'react-router-dom';

import Loader from './components/Loader/Loader';
import ScroolToTop from './components/ScrollToTop';

const HomePage = lazy(() => import('./pages/HomePage'));
const CartPage = lazy(() => import('./pages/CartPage'));
const CoursePage = lazy(() => import('./pages/AllCoursePage'));
const CourseDetailsPage = lazy(() => import('./pages/CourseDetailsPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const ForgetPasswordPage = lazy(() => import('./pages/ForgetPasswordPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
// const CreateAcc = lazy(() => import('./pages/CreateAccPage'))
// const SettingsPage = lazy(() => import('./pages/SettingsPage'));

function Routes() {
	return (
		<Suspense
			fallback={
				<div className="background">
					<div id="loadingScreen">
						<div> Loading </div>
						<Loader isLoading={true} />
					</div>
				</div>
			}
		>
			<ScroolToTop />
			<Switch>
				<Route exact path="/" element={<HomePage />} />
				<Route exact path="/All_Courses" element={<CoursePage />} />
				<Route exact path="/cart" element={<CartPage />} />
				<Route exact path="/course/*" element={<CourseDetailsPage />} />
				<Route exact path="/about" element={<AboutPage />} />
				<Route exact path="/contact" element={<ContactPage />} />
				<Route exact path="/login" element={<LoginPage />} />
				<Route exact path="/forget-password" element={<ForgetPasswordPage />} />
				{/* <Route exact path="/create-account" element={<CreateAcc />} /> */}
				{/* <Route exact path="/settings" element={<SettingsPage />} /> */}

				<Route
					path="*"
					element={
						<center>
							<h1>Page not Found</h1>
						</center>
					}
				/>
			</Switch>
		</Suspense>
	);
}

export default Routes;
