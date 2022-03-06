import { combineReducers } from 'redux';
import { authReducer, forgotPasswordReducer, userSingleDetailsReducer } from './authReducer';
import { carsReducer, carDetailsReducer } from './carReducer';
import { chatBotReducer } from './chatbotReducer';
import { favoriteCartReducer } from './favoriteCartReducer';
import {
	allAccStaffReducer,
	allAccUsersReducer,
	deleteAccUserReducer,
	profileReducer,
} from './adminReducer';

export default combineReducers({
	auth: authReducer,
	forgotPassword: forgotPasswordReducer,
	profileUser: profileReducer,
	userSingleDetail: userSingleDetailsReducer,
	allAccUsers: allAccUsersReducer,
	deleteAccUsers: deleteAccUserReducer,
	admin: allAccStaffReducer,
	carsProduct: carsReducer,
	carProductDetails: carDetailsReducer,
	favoriteCart: favoriteCartReducer,
	chatbot: chatBotReducer,
});
