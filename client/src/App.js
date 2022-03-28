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
import Car from './components/CarProduct/Car';
import CarDetail from './components/CarProduct/CarDetail';
import Register from './components/Auth/Register/Register.js';
import FavoriteCart from './components/FavoriteCart/FavoriteCart';
import ReceiveCarTo from './components/FavoriteCart/ReceiveCarTo';
import ConfirmBookCar from './components/FavoriteCart/ConfirmBookCar';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentStripe from './components/FavoriteCart/Payment/PaymentStripe';
import PaymentPayPal from './components/FavoriteCart/Payment/PaymentPayPal';
import DashboardStaff from './components/Staff/DashBoard/DashBoard';
import BarChart from './components/Charts/BarChart';
import Messenger from './components/Messenger/Messenger';
import ChatBot from './components/ChatBot/ChatBot';
import NotFound from './components/Layout/NotFound/NotFound';
import DirectRoleHome from './components/Route/DirectRoleHome';
import ConfirmOTP from './components/Auth/ForgotPassword/ConfirmOTP';
import DashBoard from './components/Admin/DashBoard/DashBoard';
import AllAccStaff from './components/Admin/ManagerAccStaff/AllAccStaff/AllAccStaff';
import AllAccUser from './components/Admin/AllAccUser/AllAccUser';
import EditRole from './components/Admin/AllAccUser/EditRole';
import CreateAccStaff from './components/Admin/ManagerAccStaff/CreateAccStaff/CreateAccStaff';
import ChangePasswordStaff from './components/Admin/ManagerAccStaff/ChangePasswordStaff/ChangePasswordStaff';
import Profile from './components/User/Profile';
import EditProfile from './components/User/EditProfile';
import ChangePassword from './components/User/ChangePassword';
import AllCar from './components/Admin/ManagerCar/AllCar';
import CreateCar from './components/Admin/ManagerCar/CreateCar';
import UpdateCar from './components/Admin/ManagerCar/UpdateCar';
import AssignCar from './components/Staff/AssignCar/AssignCar';
import AssignCarToDriver from './components/Staff/AssignCar/AssignCarToDriver';
import Home from './components/Home/Home';
import CarRefreshSearch from './components/CarProduct/CarRefreshSearch';
import PaymentSuccess from './components/FavoriteCart/Payment/PaymentSuccess';
import MyBooking from './components/Booking/MyBooking';
import BookingDetail from './components/Booking/BookingDetail';
import AllBooking from './components/Staff/ManagerBooking/AllBooking';
import UpdateBooking from './components/Staff/ManagerBooking/UpdateBooking';
import ProfileAdmin from './components/Admin/Profile/ProfileAdmin';
import ChangePasswordAdmin from './components/Admin/Profile/ChangePasswordAdmin';
import EditProfileAdmin from './components/Admin/Profile/EditProfileAdmin';
import ProfileStaff from './components/Staff/Profile/ProfileStaff';
import EditProfileStaff from './components/Staff/Profile/EditProfileStaff';
import StaffPWChange from './components/Staff/Profile/StaffPWChange';
import AllAccDriver from './components/Staff/ManagerAccDriver/AllAccDriver';
import ChangePasswordDriver from './components/Staff/ManagerAccDriver/ChangePasswordDriver';
import CreateAccDriver from './components/Staff/ManagerAccDriver/CreateAccDriver';

function App() {
	const dispatch = useDispatch();
	const { user, isLoggedIn } = useSelector((state) => state.auth);
	const [stripeApiKey, setStripeApiKey] = useState('');

	const getApiKeyStripe = async () => {
		const res = await axios.get('/api/booking/sendApiKeyStripe');
		setStripeApiKey(res.data.stripeApiKey);
	};

	useEffect(() => {
		dispatch(loadUser());
		getApiKeyStripe();
	}, [dispatch]);

	return (
		<BrowserRouter>
			{user?.role === 'User' ||
			user?.role === 'Driver' ||
			isLoggedIn === false ? (
				<Header />
			) : null}
			{/* {user?.role === 'Admin' || user?.role === 'Staff' ? null : null} */}

			<Routes>
				<Route path="*" element={<NotFound />} />
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
				<Route
					path="/carProduct/:keyword/:startDay/:endDay"
					element={<Car />}
				/>
				<Route path="/carProduct/:id" element={<CarDetail />} />
				<Route path="/favoriteCart" element={<FavoriteCart />} />
				<Route
					path="/carProduct/refreshSearch"
					element={<CarRefreshSearch />}
				/>
				<Route
					path="/myProfile"
					element={
						<ProtectedRoute>
							<Profile />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/user/editProfile"
					element={
						<ProtectedRoute>
							<EditProfile />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/user/changePassword"
					element={
						<ProtectedRoute>
							<ChangePassword />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/receiveCarTo"
					element={
						<ProtectedRoute>
							<ReceiveCarTo />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/confirmBookCar"
					element={
						<ProtectedRoute>
							<ConfirmBookCar />
						</ProtectedRoute>
					}
				/>
				{stripeApiKey && (
					<Route
						path="/paymentWithStripe"
						element={
							<Elements stripe={loadStripe(stripeApiKey)}>
								<PaymentStripe />
							</Elements>
						}
					/>
				)}
				<Route
					path="/paymentWithPayPal"
					element={
						<Elements>
							<PaymentPayPal />
						</Elements>
					}
				/>
				<Route
					path="/paymentSuccess"
					element={
						<ProtectedRoute>
							<PaymentSuccess />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/myBooking"
					element={
						<ProtectedRoute>
							<MyBooking />
						</ProtectedRoute>
					}
				/>

				<Route
					path="/bookingDetail/:id"
					element={
						<ProtectedRoute>
							<BookingDetail />
						</ProtectedRoute>
					}
				/>

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
					path="/admin/profile"
					element={
						<ProtectedRoute isAdmin={true}>
							<ProfileAdmin />
						</ProtectedRoute>
					}
				/>

				<Route
					exact
					path="/admin/changePassword"
					element={
						<ProtectedRoute isAdmin={true}>
							<ChangePasswordAdmin />
						</ProtectedRoute>
					}
				/>

				<Route
					exact
					path="/admin/editProfile"
					element={
						<ProtectedRoute isAdmin={true}>
							<EditProfileAdmin />
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
				<Route
					exact
					path="/admin/manager/accStaff/changePassword/:id"
					element={
						<ProtectedRoute isAdmin={true}>
							<ChangePasswordStaff />
						</ProtectedRoute>
					}
				/>
				<Route
					exact
					path="/admin/manager/allCar"
					element={
						<ProtectedRoute isAdmin={true}>
							<AllCar />
						</ProtectedRoute>
					}
				/>
				<Route
					exact
					path="/admin/manager/allCar/create"
					element={
						<ProtectedRoute isAdmin={true}>
							<CreateCar />
						</ProtectedRoute>
					}
				/>
				<Route
					exact
					path="/admin/manager/allCar/update/:id"
					element={
						<ProtectedRoute isAdmin={true}>
							<UpdateCar />
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

				<Route
					exact
					path="/staff/profile"
					element={
						<ProtectedRoute isStaff={true}>
							<ProfileStaff />
						</ProtectedRoute>
					}
				/>

				<Route
					exact
					path="/staff/changePassword"
					element={
						<ProtectedRoute isStaff={true}>
							<StaffPWChange />
						</ProtectedRoute>
					}
				/>

				<Route
					exact
					path="/staff/editProfile"
					element={
						<ProtectedRoute isStaff={true}>
							<EditProfileStaff />
						</ProtectedRoute>
					}
				/>

				<Route
					exact
					path="/staff/manager/accDriver"
					element={
						<ProtectedRoute isStaff={true}>
							<AllAccDriver />
						</ProtectedRoute>
					}
				/>

				<Route
					exact
					path="/staff/manager/accDriver/create"
					element={
						<ProtectedRoute isStaff={true}>
							<CreateAccDriver />
						</ProtectedRoute>
					}
				/>

				<Route
					exact
					path="/staff/manager/changePassword/:id"
					element={
						<ProtectedRoute isStaff={true}>
							<ChangePasswordDriver />
						</ProtectedRoute>
					}
				/>

				<Route
					exact
					path="/staff/assignCar"
					element={
						<ProtectedRoute isStaff={true}>
							<AssignCar />
						</ProtectedRoute>
					}
				/>
				<Route
					exact
					path="/manager/allBooking"
					element={
						<ProtectedRoute isStaff={true}>
							<AllBooking />
						</ProtectedRoute>
					}
				/>
				<Route
					exact
					path="/manager/updateStatusBooking/:id"
					element={
						<ProtectedRoute isStaff={true}>
							<UpdateBooking />
						</ProtectedRoute>
					}
				/>
				<Route
					exact
					path="/staff/assignCarToDriver/:id"
					element={
						<ProtectedRoute isStaff={true}>
							<AssignCarToDriver />
						</ProtectedRoute>
					}
				/>
				{/* Driver  */}
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
