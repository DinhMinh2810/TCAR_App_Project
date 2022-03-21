import axios from 'axios';

// Create booking
export const createBooking = (book) => async (dispatch) => {
	try {
		dispatch({ type: 'CREATE_BOOKING_REQUEST' });

		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		const res = await axios.post('/api/booking/create', book, config);

		dispatch({ type: 'CREATE_BOOKING_SUCCESS', payload: res.data });
	} catch (error) {
		dispatch({
			type: 'CREATE_BOOKING_FAIL',
			payload: error.response.data.message,
		});
	}
};

// My Booking
export const myBooking = () => async (dispatch) => {
	try {
		dispatch({ type: 'MY_BOOKS_REQUEST' });

		const { data } = await axios.get('/api/booking/myBooking');

		dispatch({ type: 'MY_BOOKS_SUCCESS', payload: data.booking });
	} catch (error) {
		dispatch({
			type: 'MY_BOOKS_FAIL',
			payload: error.response.data.message,
		});
	}
};

// Get booking details
export const getBookingDetails = (id) => async (dispatch) => {
	try {
		dispatch({ type: 'BOOKING_DETAILS_REQUEST' });

		const { data } = await axios.get(`/api/booking/bookingDetail/${id}`);

		dispatch({ type: 'BOOKING_DETAILS_SUCCESS', payload: data.booking });
	} catch (error) {
		dispatch({
			type: 'BOOKING_DETAILS_FAIL',
			payload: error.response.data.message,
		});
	}
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
	dispatch({ type: 'CLEAR_ERRORS' });
};
