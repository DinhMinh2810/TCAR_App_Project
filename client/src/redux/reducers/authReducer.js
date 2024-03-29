/* eslint-disable no-duplicate-case */
const initialState = { user: {} };

export const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'REGISTER_REQUEST':
		case 'LOGIN_REQUEST':
		case 'LOAD_USER_REQUEST':
			return {
				loading: true,
				isLoggedIn: false,
			};

		case 'ACTIVE_MAIL_REGISTER_SUCCESS':
		case 'LOGIN_SUCCESS':
		case 'LOAD_USER_SUCCESS':
			return {
				...state,
				loading: false,
				isLoggedIn: true,
				user: action.payload,
			};

		case 'REGISTER_SUCCESS':
			return {
				...state,
				loading: false,
				message: action.payload,
			};

		case 'REGISTER_FAIL':
		case 'ACTIVE_MAIL_REGISTER_FAIL':
		case 'LOGIN_FAIL':
			return {
				...state,
				loading: false,
				isLoggedIn: false,
				user: null,
				error: action.payload,
			};
		case 'LOAD_USER_FAIL':
			return {
				loading: false,
				isLoggedIn: false,
				user: null,
				error: action.payload,
			};
		case 'LOGOUT_SUCCESS':
			return {
				loading: false,
				isLoggedIn: false,
				user: null,
			};

		case 'LOGOUT_FAIL':
			return {
				...state,
				loading: false,
				error: action.payload,
			};

		case 'CLEAR_ERRORS':
			return {
				...state,
				error: null,
			};

		default:
			return state;
	}
};

export const loginGoogleReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'LOGIN_GG_REQUEST':
		case 'LOGIN_FB_REQUEST':
			return {
				loading: true,
				isLoggedIn: false,
			};

		case 'LOGIN_GG_SUCCESS':
		case 'LOGIN_FB_SUCCESS':
			return {
				...state,
				loading: false,
				isLoggedIn: true,
				message: action.payload.message,
				token: action.payload.token,
				user: action.payload.user,
			};

		case 'LOGIN_GG_FAIL':
		case 'LOGIN_FB_SUCCESS':
			return {
				...state,
				loading: false,
				isLoggedIn: false,
				user: null,
				error: action.payload,
			};
		case 'CLEAR_ERRORS':
			return {
				...state,
				error: null,
			};

		default:
			return state;
	}
};

export const forgotPasswordReducer = (state = {}, action) => {
	switch (action.type) {
		case 'FORGOT_PASSWORD_REQUEST':
		case 'CONFIRM_OTP_REQUEST':
		case 'RESET_PASSWORD_REQUEST':
			return {
				...state,
				loading: true,
				error: null,
			};
		case 'FORGOT_PASSWORD_SUCCESS':
			return {
				...state,
				loading: false,
				message: action.payload,
			};
		case 'RESET_PASSWORD_SUCCESS':
			return {
				...state,
				loading: false,
				success: action.payload,
			};
		case 'CONFIRM_OTP_SUCCESS': {
			return {
				...state,
				loading: false,
				data: action.payload,
			};
		}
		case 'FORGOT_PASSWORD_FAIL':
		case 'CONFIRM_OTP_FAIL':
		case 'RESET_PASSWORD_FAIL':
			return {
				...state,
				loading: false,
				error: action.payload,
			};

		case 'CLEAR_ERRORS':
			return {
				...state,
				error: null,
			};

		default:
			return state;
	}
};

export const userSingleDetailsReducer = (state = { user: {} }, action) => {
	switch (action.type) {
		case 'USER_DETAILS_REQUEST':
			return {
				...state,
				loading: true,
			};
		case 'USER_DETAILS_SUCCESS':
			return {
				...state,
				loading: false,
				user: action.payload,
			};

		case 'USER_DETAILS_FAIL':
			return {
				...state,
				loading: false,
				error: action.payload,
			};

		case 'CLEAR_ERRORS':
			return {
				...state,
				error: null,
			};

		default:
			return state;
	}
};
