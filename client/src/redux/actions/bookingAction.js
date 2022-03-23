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

// Get All booking - staff
export const getAllBooking = () => async (dispatch) => {
	try {
		dispatch({ type: 'ALL_BOOKING_REQUEST' });

		const { data } = await axios.get('/api/booking/getAllBooking');

		dispatch({ type: 'ALL_BOOKING_SUCCESS', payload: data.booking });
	} catch (error) {
		dispatch({
			type: 'ALL_BOOKING_FAIL',
			payload: error.response.data.message,
		});
	}
};

// Update Status Booking - Staff
export const updateStatusBooking = (id, book) => async (dispatch) => {
	try {
		dispatch({ type: 'UPDATE_STATUS_BOOKING_REQUEST' });

		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		const { data } = await axios.put(
			`/api/booking/updateBookingStatus/${id}`,
			book,
			config
		);

		dispatch({ type: 'UPDATE_STATUS_BOOKING_SUCCESS', payload: data.success });
	} catch (error) {
		dispatch({
			type: 'UPDATE_STATUS_BOOKING_FAIL',
			payload: error.response.data.message,
		});
	}
};

// Delete booking - staff
export const deleteBooking = (id) => async (dispatch) => {
	try {
		dispatch({ type: 'DELETE_BOOKING_REQUEST' });

		const { data } = await axios.delete(`/api/booking/delete${id}`);

		dispatch({ type: 'DELETE_BOOKING_SUCCESS', payload: data.success });
	} catch (error) {
		dispatch({
			type: 'DELETE_BOOKING_FAIL',
			payload: error.response.data.message,
		});
	}
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
	dispatch({ type: 'CLEAR_ERRORS' });
};
