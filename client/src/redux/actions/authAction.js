import axios from 'axios';

export const register = (userData) => async (dispatch) => {
	try {
		dispatch({ type: 'REGISTER_USER_REQUEST' });

		const config = { headers: { 'Content-Type': 'multipart/form-data' } };

		const res = await axios.post(`/api/register`, userData, config);

		dispatch({ type: 'REGISTER_USER_SUCCESS', payload: res.data });
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

		const { data } = await axios.post(
			'/api/login',
			{ email, password },
			config
		);

		dispatch({ type: 'LOGIN_SUCCESS', payload: data.user });
	} catch (error) {
		dispatch({ type: 'LOGIN_FAIL', payload: error.response.data.message });
	}
};

export const loginGoogle = (tokenId) => async (dispatch) => {
	try {
		dispatch({ type: 'LOGIN_GG_REQUEST' });
		const config = { headers: { 'Content-Type': 'application/json' } };

		const { data } = await axios.post('/api/googleLogin', { tokenId }, config);

		dispatch({ type: 'LOGIN_GG_SUCCESS', payload: data });
	} catch (error) {
		dispatch({ type: 'LOGIN_GG_FAIL', payload: error.response.data.message });
	}
};

export const loginFacebook = (accessToken, userID) => async (dispatch) => {
	try {
		dispatch({ type: 'LOGIN_FB_REQUEST' });
		const config = { headers: { 'Content-Type': 'application/json' } };

		const res = await axios.post(
			'/api/facebookLogin',
			{ accessToken, userID },
			config
		);

		dispatch({ type: 'LOGIN_FB_SUCCESS', payload: res.data });
	} catch (error) {
		dispatch({ type: 'LOGIN_FB_FAIL', payload: error.response.data.message });
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
export const forgotPassword =
	(email, phoneNumber, method) => async (dispatch) => {
		try {
			dispatch({ type: 'FORGOT_PASSWORD_REQUEST' });

			const config = { headers: { 'Content-Type': 'application/json' } };

			const { data } = await axios.post(
				`/api/forgotPassword`,
				{ email, phoneNumber, method },
				config
			);

			dispatch({ type: 'FORGOT_PASSWORD_SUCCESS', payload: data });
		} catch (error) {
			dispatch({
				type: 'FORGOT_PASSWORD_FAIL',
				payload: error.response.data.message,
			});
		}
	};

export const confirmOTP = (email, otp) => async (dispatch) => {
	try {
		dispatch({ type: 'CONFIRM_OTP_REQUEST' });

		const config = { headers: { 'Content-Type': 'application/json' } };

		const { data } = await axios.post(
			`/api/OtpResetPassword`,
			{ email, otp },
			config
		);

		dispatch({ type: 'CONFIRM_OTP_SUCCESS', payload: data });
	} catch (error) {
		dispatch({
			type: 'CONFIRM_OTP_FAIL',
			payload: error.response.data.message,
		});
	}
};

// Reset Password
export const resetPassword = (token, password) => async (dispatch) => {
	try {
		dispatch({ type: 'RESET_PASSWORD_REQUEST' });

		const config = { headers: { Authorization: token } };

		const { data } = await axios.put(
			`/api/resetPassword/${token}`,
			password,
			config
		);

		dispatch({ type: 'RESET_PASSWORD_SUCCESS', payload: data.success });
	} catch (error) {
		dispatch({
			type: 'RESET_PASSWORD_FAIL',
			payload: error.response.data.message,
		});
	}
};

// get User single Details -- Admin
export const userSingleDetail = (id) => async (dispatch) => {
	try {
		dispatch({ type: 'USER_DETAILS_REQUEST' });
		const { data } = await axios.get(`/api/singleUserDetail/${id}`);

		dispatch({ type: 'USER_DETAILS_SUCCESS', payload: data.user });
	} catch (error) {
		dispatch({
			type: 'USER_DETAILS_FAIL',
			payload: error.response.data.message,
		});
	}
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
	dispatch({ type: 'CLEAR_ERRORS' });
};
