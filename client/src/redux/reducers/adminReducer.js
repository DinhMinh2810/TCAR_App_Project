export const allAccUsersReducer = (state = { users: [] }, action) => {
	switch (action.type) {
		case 'ALL_USERS_REQUEST':
			return {
				...state,
				loading: true,
			};
		case 'ALL_USERS_SUCCESS':
			return {
				...state,
				loading: false,
				users: action.payload,
			};

		case 'ALL_USERS_FAIL':
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

export const profileReducer = (state = {}, action) => {
	switch (action.type) {
		case 'UPDATE_PROFILE_REQUEST':
		case 'UPDATE_PASSWORD_REQUEST':
		case 'UPDATE_USER_REQUEST':
			return {
				...state,
				loading: true,
			};
		case 'UPDATE_PROFILE_SUCCESS':
		case 'UPDATE_PASSWORD_SUCCESS':
		case 'UPDATE_USER_SUCCESS':
			return {
				...state,
				loading: false,
				isUpdated: action.payload,
			};

		case 'UPDATE_PROFILE_FAIL':
		case 'UPDATE_PASSWORD_FAIL':
		case 'UPDATE_USER_FAIL':
			return {
				...state,
				loading: false,
				error: action.payload,
			};

		case 'UPDATE_PROFILE_RESET':
		case 'UPDATE_PASSWORD_RESET':
		case 'UPDATE_USER_RESET':
			return {
				...state,
				isUpdated: false,
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

export const deleteAccUserReducer = (state = {}, action) => {
	switch (action.type) {
		case 'DELETE_USER_REQUEST':
			return {
				...state,
				loading: true,
			};

		case 'DELETE_USER_SUCCESS':
			return {
				...state,
				loading: false,
				isDeleted: action.payload.success,
				message: action.payload.message,
			};

		case 'DELETE_USER_FAIL':
			return {
				...state,
				loading: false,
				error: action.payload,
			};

		case 'DELETE_USER_RESET':
			return {
				...state,
				isDeleted: false,
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

export const allAccStaffReducer = (state = { users: [] }, action) => {
	switch (action.type) {
		case 'ACC_STAFF_REQUEST':
			return {
				loading: true,
			};

		case 'ACC_STAFF_SUCCESS':
			return {
				...state,
				loading: false,
				users: action.payload,
			};

		case 'ACC_STAFF_FAIL':
			return {
				loading: false,
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
