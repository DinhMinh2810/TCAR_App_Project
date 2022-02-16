import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Header from './components/Layout/Header/Header';
import Footer from './components/Layout/Footer/Footer';
import Login from './components/Auth/Login/Login';
import ActiveMailRegister from './components/Auth/Register/ActiveMailRegister';
import ForgotPassword from './components/Auth/ForgotPassword/ForgotPassword';
import ResetPassword from './components/Auth/ResetPassword/ResetPassword';
import { loadUser } from './redux/actions/authAction';
import Home from './components/Home/Home';
import Car from './components/CarProduct/Car';
import UpdateProfileSelf from './components/User/UpdateProfileSelf';
import Register from './components/Auth/Register/Register.js';

function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(loadUser());
	}, [dispatch]);

	return (
		<BrowserRouter>
			<Header />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route
					path="/api/activate/:activationToken"
					element={<ActiveMailRegister />}
				/>
				<Route exact path="/forgotPassword" element={<ForgotPassword />} />
				<Route path="/api/resetPassword/:token" element={<ResetPassword />} />

				<Route path="/user/updateProfileSelf" element={<UpdateProfileSelf />} />

				<Route path="/carProduct" element={<Car />} />

				<Route path="/carProduct/:keyword" element={<Car />} />
			</Routes>

			<Footer />
		</BrowserRouter>
	);
}

export default App;
