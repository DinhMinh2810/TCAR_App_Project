import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Header from './components/Layout/Header/Header';
import Footer from './components/Layout/Footer/Footer';
import Login from './components/Auth/Login/Login';
import Register from './components/Auth/Register/Register';
import ActiveMailRegister from './components/Auth/Register/ActiveMailRegister';
import {
	dispatchGetUser,
	dispatchLogin,
	fetchUser,
	getAccessToken,
	loadUser,
} from './redux/actions/authAction';
import ForgotPassword from './components/Auth/ForgotPassword/ForgotPassword';
import ResetPassword from './components/Auth/ResetPassword/ResetPassword';
import axios from 'axios';

function App() {
	const auth = useSelector((state) => state.auth);
	const token = useSelector((state) => state.token);
	const dispatch = useDispatch();
	const { isLoggedIn } = auth;

	useEffect(() => {
		const firstLogin = localStorage.getItem('userLogin');
		if (firstLogin) {
			const getToken = async () => {
				const res = await axios.post('/api/refreshToken', null);

				dispatch({ type: 'GET_TOKEN_SUCCESS', payload: res.data.accessToken });
			};
			getToken();
		}
	}, [auth.isLoggedIn, dispatch]);

	useEffect(() => {
		if (token) {
			const getUser = () => {
				dispatch(dispatchLogin());

				return fetchUser(token).then((res) => {
					dispatch(dispatchGetUser(res));
				});
			};
			getUser();
		}
	}, [token, dispatch]);

	// useEffect(() => {
	// 	dispatch(getAccessToken());

	// 	if (token) {
	// 		const getUser = () => {
	// 			dispatch(loadUser());
	// 			return fetchUser(token).then((res) => {
	// 				dispatch(dispatchGetUser(res));
	// 			});
	// 		};
	// 		getUser();
	// 	}
	// }, [token, dispatch]);

	return (
		<BrowserRouter>
			<Header />
			<Routes>
				<Route path="/" element={<h1>Home page ne !!</h1>} />
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
