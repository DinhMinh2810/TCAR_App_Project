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
				users: action.payload,
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
