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
