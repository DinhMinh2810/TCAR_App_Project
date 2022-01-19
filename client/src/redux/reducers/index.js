import { combineReducers } from 'redux';
import { authReducer, loadUserReducer } from './authReducer';
import { tokenReducer } from './tokenReducer';

export default combineReducers({
	auth: authReducer,
	// loadUser: loadUserReducer,
	token: tokenReducer,
});
