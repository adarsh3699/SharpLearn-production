import React, { Suspense, lazy } from 'react';
import { Routes as Switch, Route } from 'react-router-dom';

import Loader from './components/Loader/Loader';
import NavBar from './components/Bar/NavBar/NavBar';
import FootBar from './components/Bar/Footer/FootBar';

const HomePage = lazy(() => import('./pages/HomePage'));
const CartPage = lazy(() => import('./pages/CartPage'));
// const ForgetPasswordPage = lazy(() => import('./pages/ForgetPasswordPage'));
// const CreateAcc = lazy(() => import('./pages/CreateAcc'));
// const SettingsPage = lazy(() => import('./pages/SettingsPage'));

function Routes() {
	return (
		<Suspense
			fallback={
				<div className="background">
					<div id="loadingScreen">
						<div> Loading </div>
						<Loader />
					</div>
				</div>
			}
		>
			<Switch>
				<Route
					exact
					path="/"
					element={
						<>
							<NavBar />
							<HomePage />
							<FootBar />
						</>
					}
				/>
				<Route
					exact
					path="/cart"
					element={
						<>
							<NavBar />
							<CartPage />
							<FootBar />
						</>
					}
				/>
				{/* <Route exact path="/register" element={<CreateAcc />} /> */}
				{/* <Route exact path="/forget-password" element={<ForgetPasswordPage />} /> */}
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
