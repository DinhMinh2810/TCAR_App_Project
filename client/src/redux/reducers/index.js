import { combineReducers } from 'redux';
import { authReducer } from './authReducer';
import { carsReducer } from './carReducer';

export default combineReducers({
	auth: authReducer,
	carsProduct: carsReducer,
});
