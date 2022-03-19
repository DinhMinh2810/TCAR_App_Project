export const newBookingReducer = (state = {}, action) => {
	switch (action.type) {
		case 'CREATE_BOOKING_REQUEST':
			return {
				...state,
				loading: true,
			};

		case 'CREATE_BOOKING_SUCCESS':
			return {
				loading: false,
				order: action.payload,
			};

		case 'CREATE_BOOKING_FAIL':
			return {
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
