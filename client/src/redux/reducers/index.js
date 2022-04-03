import { combineReducers } from 'redux';
import {
	authReducer,
	forgotPasswordReducer,
	loginGoogleReducer,
	userSingleDetailsReducer,
} from './authReducer';
import {
	carsReducer,
	carDetailsReducer,
	newCarReducer,
	updateOrDeleteCarReducer,
	assignCarReducer,
	createReviewReducer,
	deleteReviewReducer,
	carReviewsReducer,
} from './carReducer';
import { chatBotReducer } from './chatbotReducer';
import { favoriteCartReducer } from './favoriteCartReducer';
import {
	allAccStaffReducer,
	allAccUsersReducer,
	CRUDAccStaffReducer,
	deleteAccUserReducer,
	profileReducer,
} from './adminReducer';
import { allAccDriverReducer, CRUDAccDriverReducer } from './staffReducer';
import {
	newBookingReducer,
	myBookingReducer,
	bookingDetailsReducer,
	allBookingReducer,
	updateOrDeleteBookingReducer,
	allBookingStaticTotalReducer,
	allBookingStaticTotalLocationReducer,
} from './bookingReducer';

export default combineReducers({
	auth: authReducer,
	loginWithSocial: loginGoogleReducer,
	forgotPassword: forgotPasswordReducer,
	profileUser: profileReducer,
	userSingleDetail: userSingleDetailsReducer,
	allAccUsers: allAccUsersReducer,
	deleteAccUsers: deleteAccUserReducer,
	allAccStaff: allAccStaffReducer,
	CRUDAccStaff: CRUDAccStaffReducer,
	CRUDAccDriver: CRUDAccDriverReducer,
	newCar: newCarReducer,
	updateOrDeleteCar: updateOrDeleteCarReducer,
	allAccDriver: allAccDriverReducer,
	assignCar: assignCarReducer,
	favoriteCart: favoriteCartReducer,
	newBooking: newBookingReducer,
	myBooking: myBookingReducer,
	bookingDetails: bookingDetailsReducer,
	createReview: createReviewReducer,
	allBooking: allBookingReducer,
	updateOrDeleteBooking: updateOrDeleteBookingReducer,
	carReviews: carReviewsReducer,
	deleteReview: deleteReviewReducer,
	carsProduct: carsReducer,
	carProductDetails: carDetailsReducer,
	chatbot: chatBotReducer,
	allBookingStatic: allBookingStaticTotalReducer,
	allBookingStaticTotalLocation: allBookingStaticTotalLocationReducer,
});
