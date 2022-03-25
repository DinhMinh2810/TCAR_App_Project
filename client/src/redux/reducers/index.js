import { combineReducers } from 'redux';
import {
	authReducer,
	forgotPasswordReducer,
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
import { allAccDriverReducer } from './staffReducer';
import {
	newBookingReducer,
	myBookingReducer,
	bookingDetailsReducer,
	allBookingReducer,
	updateOrDeleteBookingReducer,
} from './bookingReducer';

export default combineReducers({
	auth: authReducer,
	forgotPassword: forgotPasswordReducer,
	profileUser: profileReducer,
	userSingleDetail: userSingleDetailsReducer,
	allAccUsers: allAccUsersReducer,
	deleteAccUsers: deleteAccUserReducer,
	allAccStaff: allAccStaffReducer,
	CRUDAccStaff: CRUDAccStaffReducer,
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
	// not
	carsProduct: carsReducer,
	carProductDetails: carDetailsReducer,
	chatbot: chatBotReducer,
});
