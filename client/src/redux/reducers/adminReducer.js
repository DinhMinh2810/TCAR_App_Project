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
				users: action.payload.users,
				usersCount: action.payload.usersCount,
				resultItemPage: action.payload.resultItemPage,
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
		case 'ACC_DRIVER_REQUEST':
			return {
				...state,
				loading: true,
			};

		case 'ACC_STAFF_SUCCESS':
		case 'ACC_DRIVER_SUCCESS':
			return {
				...state,
				loading: false,
				users: action.payload.users,
				usersCount: action.payload.usersCount,
				resultItemPage: action.payload.resultItemPage,
			};

		case 'ACC_STAFF_FAIL':
		case 'ACC_DRIVER_FAIL':
			return {
				loading: false,
				users: null,
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

export const CRUDAccStaffReducer = (state = {}, action) => {
	switch (action.type) {
		case 'CREATE_ACC_STAFF_REQUEST':
			return {
				...state,
				loading: true,
			};

		case 'CREATE_ACC_STAFF_SUCCESS':
			return {
				...state,
				loading: false,
				users: action.payload,
				isCreated: action.payload.success,
			};

		case 'CREATE_ACC_STAFF_FAIL':
			return {
				...state,
				loading: false,
				error: action.payload,
			};

		case 'CREATE_ACC_STAFF_RESET':
			return {
				...state,
				users: null,
				isCreated: false,
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
