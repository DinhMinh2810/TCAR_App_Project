import { combineReducers } from 'redux';
import { authReducer, forgotPasswordReducer } from './authReducer';
import { carsReducer, carDetailsReducer } from './carReducer';
import { chatBotReducer } from './chatbotReducer';
import { favoriteCartReducer } from './favoriteCartReducer';
import { allAccStaffReducer, allAccUsersReducer } from './adminReducer';

export default combineReducers({
	auth: authReducer,
	forgotPassword: forgotPasswordReducer,
	carsProduct: carsReducer,
	carProductDetails: carDetailsReducer,
	favoriteCart: favoriteCartReducer,
	chatbot: chatBotReducer,
	allAccUsers: allAccUsersReducer,
	admin: allAccStaffReducer,
});
