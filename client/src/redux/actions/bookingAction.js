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

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
	dispatch({ type: 'CLEAR_ERRORS' });
};
