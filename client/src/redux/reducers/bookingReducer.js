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

export const allBookingStaticTotalReducer = (state = {}, action) => {
	switch (action.type) {
		case 'ALL_BOOKING_STATIC_TOTAL_REQUEST':
			return {
				loading: true,
				books: [],
			};

		case 'ALL_BOOKING_STATIC_TOTAL_SUCCESS':
			return {
				loading: false,
				totalMonth1: action.payload.totalMonth1,
				totalMonth2: action.payload.totalMonth2,
				totalMonth3: action.payload.totalMonth3,
				totalMonth4: action.payload.totalMonth4,
				totalMonth5: action.payload.totalMonth5,
				totalMonth6: action.payload.totalMonth6,
				totalMonth7: action.payload.totalMonth7,
				totalMonth8: action.payload.totalMonth8,
				totalMonth9: action.payload.totalMonth9,
				totalMonth10: action.payload.totalMonth10,
				totalMonth11: action.payload.totalMonth11,
				totalMonth12: action.payload.totalMonth12,
			};

		case 'ALL_BOOKING_STATIC_TOTAL_FAIL':
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

export const allBookingStaticTotalLocationReducer = (state = {}, action) => {
	switch (action.type) {
		case 'ALL_BOOKING_STATIC_TOTAL_LOCATION_REQUEST':
			return {
				loading: true,
				books: [],
			};

		case 'ALL_BOOKING_STATIC_TOTAL_LOCATION_SUCCESS':
			return {
				loading: false,
				totalDaNang: action.payload.totalDaNang,
				totalHaNoi: action.payload.totalHaNoi,
				totalHoChiMinh: action.payload.totalHoChiMinh,
				totalCanTho: action.payload.totalCanTho,
				totalCaMau: action.payload.totalCaMau,
				totalHaiPhong: action.payload.totalHaiPhong,
				totalGiaLai: action.payload.totalGiaLai,
				totalQuangNam: action.payload.totalQuangNam,
			};

		case 'ALL_BOOKING_STATIC_TOTAL_LOCATION_FAIL':
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
