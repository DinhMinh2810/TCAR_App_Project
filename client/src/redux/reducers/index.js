import { combineReducers } from 'redux';
import { authReducer } from './authReducer';
import { carsReducer, carDetailsReducer } from './carReducer';
import { chatBotReducer } from './chatbotReducer';
import { favoriteCartReducer } from './favoriteCartReducer';

export default combineReducers({
	auth: authReducer,
	carsProduct: carsReducer,
	carProductDetails: carDetailsReducer,
	favoriteCart: favoriteCartReducer,
	chatbot: chatBotReducer,
});
