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

export const allBookingReducer = (state = { books: [] }, action) => {
	switch (action.type) {
		case 'ALL_BOOKING_REQUEST':
			return {
				loading: true,
				books: [],
			};

		case 'ALL_BOOKING_SUCCESS':
			return {
				loading: false,
				totalAllPrice: action.payload.totalAllPrice,
				booksCount: action.payload.booksCount,
				resultItemPage: action.payload.resultItemPage,
				books: action.payload.books,
			};
		case 'ALL_BOOKING_DRIVER_SUCCESS':
			return {
				loading: false,
				userBooksCount: action.payload.userBooksCount,
				resultItemPage: action.payload.resultItemPage,
				books: action.payload.books,
			};

		case 'ALL_BOOKING_FAIL':
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

export const updateOrDeleteBookingReducer = (state = {}, action) => {
	switch (action.type) {
		case 'UPDATE_STATUS_BOOKING_REQUEST':
		case 'DELETE_BOOKING_REQUEST':
			return {
				...state,
				loading: true,
			};

		case 'UPDATE_STATUS_BOOKING_SUCCESS':
			return {
				...state,
				loading: false,
				isUpdated: action.payload,
			};

		case 'DELETE_BOOKING_SUCCESS':
			return {
				...state,
				loading: false,
				isDeleted: action.payload,
			};

		case 'UPDATE_STATUS_BOOKING_FAIL':
		case 'DELETE_BOOKING_FAIL':
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		case 'UPDATE_STATUS_BOOKING_RESET':
			return {
				...state,
				isUpdated: false,
			};

		case 'DELETE_BOOKING_RESET':
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
