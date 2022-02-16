import axios from 'axios';

// export const register = (name, email, password) => async (dispatch) => {
// 	try {
// 		dispatch({ type: 'REGISTER_REQUEST' });

// 		const res = await axios.post('/api/register', {
// 			name,
// 			email,
// 			password,
// 		});

// 		dispatch({ type: 'REGISTER_SUCCESS', payload: res.data });
// 	} catch (error) {
// 		dispatch({ type: 'REGISTER_FAIL', payload: error.response.data.message });
// 	}
// };

export const register = (userData) => async (dispatch) => {
	try {
		dispatch({ type: 'REGISTER_USER_REQUEST' });

		const config = { headers: { 'Content-Type': 'multipart/form-data' } };

		const { data } = await axios.post(`/api/register`, userData, config);

		dispatch({ type: 'REGISTER_USER_SUCCESS', payload: data.user });
	} catch (error) {
		dispatch({
			type: 'REGISTER_USER_FAIL',
			payload: error.response.data.message,
		});
	}
};

export const activeMailRegister = (activationToken) => async (dispatch) => {
	try {
		if (activationToken) {
			const res = await axios.post('/api/activateEmail', {
				activationToken,
			});

			dispatch({ type: 'ACTIVE_MAIL_REGISTER_SUCCESS', payload: res.data });
		}
	} catch (error) {
		dispatch({
			type: 'ACTIVE_MAIL_REGISTER_FAIL',
			payload: error.response.data.message,
		});
	}
};

export const login = (email, password) => async (dispatch) => {
	try {
		dispatch({ type: 'LOGIN_REQUEST' });
		const config = { headers: { 'Content-Type': 'application/json' } };

		const res = await axios.post('/api/login', { email, password }, config);

		dispatch({ type: 'LOGIN_SUCCESS', payload: res.data.user });
	} catch (error) {
		dispatch({ type: 'LOGIN_FAIL', payload: error.response.data.message });
	}
};

export const loginGoogle = (tokenId) => async (dispatch) => {
	try {
		dispatch({ type: 'LOGIN_REQUEST' });
		const config = { headers: { 'Content-Type': 'application/json' } };

		const res = await axios.post('/api/googleLogin', { tokenId }, config);

		dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
	} catch (error) {
		dispatch({ type: 'LOGIN_FAIL', payload: error.response.data.message });
	}
};

export const loginFacebook = (accessToken, userID) => async (dispatch) => {
	try {
		dispatch({ type: 'LOGIN_REQUEST' });
		const config = { headers: { 'Content-Type': 'application/json' } };

		const res = await axios.post(
			'/api/facebookLogin',
			{ accessToken, userID },
			config
		);

		dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
	} catch (error) {
		dispatch({ type: 'LOGIN_FAIL', payload: error.response.data.message });
	}
};

export const getAccessToken = () => async (dispatch) => {
	try {
		const userLogin = localStorage.getItem('userLogin');
		if (userLogin) {
			const getToken = async () => {
				const res = await axios.post('/api/refreshToken', null);
				dispatch({ type: 'GET_TOKEN_SUCCESS', payload: res.data.accessToken });
			};
			getToken();
		}
	} catch (error) {
		dispatch({ type: 'GET_TOKEN_FAIL', payload: error.response.data.message });
	}
};

// Get user is exsting in app
export const loadUser = () => async (dispatch) => {
	try {
		dispatch({ type: 'LOAD_USER_REQUEST' });

		const res = await axios.get('/api/userDetailExist');

		dispatch({ type: 'LOAD_USER_SUCCESS', payload: res.data });
	} catch (error) {
		dispatch({ type: 'LOAD_USER_FAIL', payload: error.response.data.message });
	}
};

export const logout = () => async (dispatch) => {
	try {
		await axios.get('/api/logout');
		dispatch({ type: 'LOGOUT_SUCCESS' });
	} catch (error) {
		dispatch({ type: 'LOGOUT_FAIL', payload: error.response.data.message });
	}
};

// Forgot Password
export const forgotPassword = (email) => async (dispatch) => {
	try {
		dispatch({ type: 'FORGOT_PASSWORD_REQUEST' });

		const config = { headers: { 'Content-Type': 'application/json' } };

		const { data } = await axios.post(`/api/forgotPassword`, email, config);

		dispatch({ type: 'FORGOT_PASSWORD_SUCCESS', payload: data.message });
	} catch (error) {
		dispatch({
			type: 'FORGOT_PASSWORD_FAIL',
			payload: error.response.data.message,
		});
	}
};

// Reset Password
export const resetPassword = (token, passwords) => async (dispatch) => {
	try {
		dispatch({ type: 'RESET_PASSWORD_REQUEST' });

		const config = { headers: { Authorization: token } };

		const { data } = await axios.put(`/api/resetPassword`, passwords, config);

		dispatch({ type: 'RESET_PASSWORD_SUCCESS', payload: data.success });
	} catch (error) {
		dispatch({
			type: 'RESET_PASSWORD_FAIL',
			payload: error.response.data.message,
		});
	}
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
	dispatch({ type: 'CLEAR_ERRORS' });
};
