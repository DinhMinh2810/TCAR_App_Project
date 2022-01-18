import axios from 'axios';

export const register = (name, email, password) => async (dispatch) => {
	try {
		dispatch({ type: 'REGISTER_REQUEST' });

		const res = await axios.post('/api/register', {
			name,
			email,
			password,
		});

		dispatch({ type: 'REGISTER_SUCCESS', payload: res.data });
	} catch (error) {
		dispatch({ type: 'REGISTER_FAIL', payload: error.response.data.message });
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
		localStorage.setItem('userLogin', true);

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

export const logout = (token) => async (dispatch) => {
	try {
		localStorage.removeItem('userLogin');
		if (token) {
			await axios.get('/api/logout');
		}
		dispatch({ type: 'LOGOUT_SUCCESS' });
	} catch (error) {
		dispatch({ type: 'LOGOUT_FAIL', payload: error.response.data.message });
	}
};

// Get user is exsting in app
export const loadUser = () => {
	return {
		type: 'LOAD_USER_SUCCESS',
	};
};

export const fetchUser = async (token) => {
	const res = await axios.get('/api/getDetailUser', {
		headers: { Authorization: token },
	});
	return res;
};

export const dispatchGetUser = (res) => {
	return {
		type: 'GET_USER_SUCCESS',
		payload: {
			user: res.data,
		},
	};
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

export const dispatchLogin = () => {
	return {
		type: 'LOGIN',
	};
};
