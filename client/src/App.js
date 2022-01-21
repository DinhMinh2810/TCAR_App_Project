import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Layout/Header/Header';
import Footer from './components/Layout/Footer/Footer';
import Login from './components/Auth/Login/Login';
import Register from './components/Auth/Register/Register';
import ActiveMailRegister from './components/Auth/Register/ActiveMailRegister';
import ForgotPassword from './components/Auth/ForgotPassword/ForgotPassword';
import ResetPassword from './components/Auth/ResetPassword/ResetPassword';

function App() {
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
