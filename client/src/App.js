import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Header from './components/Layout/Header/Header';
import Footer from './components/Layout/Footer/Footer';
import Login from './components/Auth/Login/Login';
import Register from './components/Auth/Register/Register';
import Register1 from './components/Auth/Login/Register1';
import ActiveMailRegister from './components/Auth/Register/ActiveMailRegister';
import {
	dispatchGetUser,
	fetchUser,
	getAccessToken,
	loadUser,
} from './redux/actions/authAction';
import ForgotPassword from './components/Auth/ForgotPassword/ForgotPassword';
import ResetPassword from './components/Auth/ResetPassword/ResetPassword';
import LoginMain from './components/Auth/Login/LoginMain';


function App() {
	const token = useSelector((state) => state.token);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getAccessToken());

		if (token) {
			const getUser = () => {
				dispatch(loadUser());
				return fetchUser(token).then((res) => {
					dispatch(dispatchGetUser(res));
				});
			};
			getUser();
		}
	}, [token, dispatch]);

	return (
		<BrowserRouter>
			<Header />
			<Routes>
				<Route path="/" element={<Register1 />} />
				<Route path="/loginm" element={<LoginMain />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route
					path="/api/activate/:activationToken"
					element={<ActiveMailRegister />}
				/>
				<Route path="/forgotPassword" element={<ForgotPassword />} />
				<Route path="/api/resetPassword/:token" element={<ResetPassword />} />
			</Routes>
			<Footer />
		</BrowserRouter>
	);
}

export default App;
