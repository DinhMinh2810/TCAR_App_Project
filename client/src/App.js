import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { loadUser } from './redux/actions/authAction';
import ProtectedRoute from './components/Route/ProtectedRoute';
import Header from './components/Layout/Header/Header';
import Footer from './components/Layout/Footer/Footer';
import Login from './components/Auth/Login/Login';
import ActiveMailRegister from './components/Auth/Register/ActiveMailRegister';
import ForgotPassword from './components/Auth/ForgotPassword/ForgotPassword';
import ResetPassword from './components/Auth/ResetPassword/ResetPassword';
import Home from './components/Home/Home';
import Car from './components/CarProduct/Car';
import CarDetail from './components/CarProduct/CarDetail';
import UpdateProfileSelf from './components/User/UpdateProfileSelf';
import Register from './components/Auth/Register/Register.js';
import FavoriteCart from './components/FavoriteCart/FavoriteCart';
import ReceiveCarTo from './components/FavoriteCart/ReceiveCarTo/ReceiveCarTo';
import ConfirmBookCar from './components/FavoriteCart/ConfirmBookCar/ConfirmBookCar';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentStripe from './components/FavoriteCart/Payment/PaymentStripe';
import PaymentPayPal from './components/FavoriteCart/Payment/PaymentPayPal';
import DashboardAdmin from './components/Admin/Dashboard';
import DashboardStaff from './components/Staff/Dashboard';
import BarChart from './components/Charts/BarChart';
import Messenger from './components/Messenger/Messenger';
import ChatBot from './components/ChatBot/ChatBot';
import NotFound from './components/Layout/NotFound/NotFound';
import OutLetRoute from './components/Route/OutLetRoute';

function App() {
	const dispatch = useDispatch();

	const [stripeApiKey, setStripeApiKey] = useState('');

	const getApiKeyStripe = async () => {
		const res = await axios.get('/api/booking/sendApiKeyStripe');

		setStripeApiKey(res.data.stripeApiKey);
	};

	useEffect(() => {
		dispatch(loadUser());
		// getApiKeyStripe();
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
				<Route path="/carProduct/:id" element={<CarDetail />} />
				<Route path="/favoriteCart" element={<FavoriteCart />} />
				<Route path="/receiveCarTo" element={<ReceiveCarTo />} />
				<Route path="/confirmBookCar" element={<ConfirmBookCar />} />

				{/* {stripeApiKey && (
					<Route
						path="/paymentWithStripe"
						element={
							<Elements stripe={loadStripe(stripeApiKey)}>
								<PaymentStripe />
							</Elements>
						}
					/>
				)} */}

				{/* <Route path="/paymentWithPayPal" element={<PaymentPayPal />} /> */}
				{/* <Route
					exact
					path="/admin/dashboard"
					element={
						<ProtectedRoute isAdmin={true}>
							<DashboardAdmin />
						</ProtectedRoute>
					}
				/>

				<Route
					exact
					path="/staff/dashboard"
					element={
						<ProtectedRoute isStaff={true}>
							<DashboardStaff />
						</ProtectedRoute>
					}
				/> */}

				{/* <Route path="/barChart" element={<BarChart />} /> */}
				<Route
					path="/messenger"
					element={
						<ProtectedRoute>
							<Messenger />
						</ProtectedRoute>
					}
				/>

				<Route path="/chatbot" element={<ChatBot />} />

				<Route path="/notFound" element={<NotFound />} />
			</Routes>

			{/* <Footer /> */}
		</BrowserRouter>
	);
}

export default App;
