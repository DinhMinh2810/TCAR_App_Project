import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
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
import DashboardStaff from './components/Staff/Dashboard';
import BarChart from './components/Charts/BarChart';
import Messenger from './components/Messenger/Messenger';
import ChatBot from './components/ChatBot/ChatBot';
import NotFound from './components/Layout/NotFound/NotFound';
import DirectRoleHome from './components/Route/DirectRoleHome';
import ConfirmOTP from './components/Auth/ForgotPassword/ConfirmOTP';
import DashBoard from './components/Admin/DashBoard/DashBoard';
import HeaderBarAdmin from './components/Admin/HeaderBarAdmin/HeaderBarAdmin';
import AllAccStaff from './components/Admin/ManagerAccStaff/AllAccStaff/AllAccStaff';
import AllAccUser from './components/Admin/AllAccUser/AllAccUser';
import EditRole from './components/Admin/AllAccUser/EditRole';
import CreateAccStaff from './components/Admin/ManagerAccStaff/CreateAccStaff/CreateAccStaff';

function App() {
	const dispatch = useDispatch();
	const { user, isLoggedIn } = useSelector((state) => state.auth);
	const [stripeApiKey, setStripeApiKey] = useState('');

	// const getApiKeyStripe = async () => {
	// 	const res = await axios.get('/api/booking/sendApiKeyStripe');
	// 	setStripeApiKey(res.data.stripeApiKey);
	// };

	useEffect(() => {
		dispatch(loadUser());
		// getApiKeyStripe();
	}, [dispatch]);

	return (
		<BrowserRouter>
			{user?.role === 'User' ||
			user?.role === 'Driver' ||
			isLoggedIn === false ? (
				<Header />
			) : null}
			{user?.role === 'Admin' || user?.role === 'Staff' ? null : null}
			{/* 
			{user?.role === 'User' ||
			user?.role === 'Driver' ||
			isLoggedIn === false ? (
				<Header />
			) : null}
			{user?.role === 'Admin' ? <HeaderBarAdmin /> : null} */}

			<Routes>
				<Route
					path="/"
					element={
						<DirectRoleHome>
							<Home />
						</DirectRoleHome>
					}
				/>
				<Route path="/login" element={<Login />} />

				<Route path="/register" element={<Register />} />
				<Route
					path="/api/activate/:activationToken"
					element={<ActiveMailRegister />}
				/>

				<Route exact path="/forgotPassword" element={<ForgotPassword />} />

				<Route
					exact
					path="/forgotPassword/confirmOTP"
					element={<ConfirmOTP />}
				/>

				<Route path="/resetPassword/:token" element={<ResetPassword />} />

				{/* here */}

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

				{/* Admin  */}
				<Route
					exact
					path="/admin/dashboard"
					element={
						<ProtectedRoute isAdmin={true}>
							<DashBoard />
						</ProtectedRoute>
					}
				/>

				<Route
					exact
					path="/admin/manager/allAccount"
					element={
						<ProtectedRoute isAdmin={true}>
							<AllAccUser />
						</ProtectedRoute>
					}
				/>

				<Route
					exact
					path="/admin/manager/allAccount/editRole/:id"
					element={
						<ProtectedRoute isAdmin={true}>
							<EditRole />
						</ProtectedRoute>
					}
				/>

				<Route
					exact
					path="/admin/manager/accStaff"
					element={
						<ProtectedRoute isAdmin={true}>
							<AllAccStaff />
						</ProtectedRoute>
					}
				/>

				<Route
					exact
					path="/admin/manager/accStaff/create"
					element={
						<ProtectedRoute isAdmin={true}>
							<CreateAccStaff />
						</ProtectedRoute>
					}
				/>

				{/* Staff  */}
				<Route
					exact
					path="/staff/dashboard"
					element={
						<ProtectedRoute isStaff={true}>
							<DashboardStaff />
						</ProtectedRoute>
					}
				/>

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

			{user?.role === 'User' ||
			user?.role === 'Driver' ||
			isLoggedIn === false ? (
				<Footer />
			) : null}
		</BrowserRouter>
	);
}

export default App;
