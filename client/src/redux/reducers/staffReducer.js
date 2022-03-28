export const allAccDriverReducer = (state = { users: [] }, action) => {
	switch (action.type) {
		case 'ACC_DRIVER_REQUEST':
			return {
				...state,
				loading: true,
			};

		case 'ACC_DRIVER_SUCCESS':
			return {
				...state,
				loading: false,
				users: action.payload.users,
				usersCount: action.payload.usersCount,
				resultItemPage: action.payload.resultItemPage,
			};

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

export const CRUDAccDriverReducer = (state = {}, action) => {
	switch (action.type) {
		case 'CREATE_ACC_DRIVER_REQUEST':
			return {
				...state,
				loading: true,
			};

		case 'CREATE_ACC_DRIVER_SUCCESS':
			return {
				...state,
				loading: false,
				users: action.payload,
				isCreated: action.payload.success,
			};

		case 'CREATE_ACC_DRIVER_FAIL':
			return {
				...state,
				loading: false,
				error: action.payload,
			};

		case 'CREATE_ACC_DRIVER_RESET':
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
