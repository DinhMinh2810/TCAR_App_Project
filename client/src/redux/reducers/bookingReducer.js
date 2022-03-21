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
				book: action.payload,
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

export const myBookingReducer = (state = { books: [] }, action) => {
	switch (action.type) {
		case 'MY_BOOKS_REQUEST':
			return {
				loading: true,
			};

		case 'MY_BOOKS_SUCCESS':
			return {
				loading: false,
				books: action.payload,
			};

		case 'MY_BOOKS_FAIL':
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

export const bookingDetailsReducer = (state = { book: {} }, action) => {
	switch (action.type) {
		case 'BOOKING_DETAILS_REQUEST':
			return {
				loading: true,
			};

		case 'BOOKING_DETAILS_SUCCESS':
			return {
				loading: false,
				book: action.payload,
			};

		case 'BOOKING_DETAILS_FAIL':
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
