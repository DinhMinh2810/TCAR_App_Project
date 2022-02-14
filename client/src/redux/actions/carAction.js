import axios from 'axios';

// Get All car Products
export const getCars = () => async (dispatch) => {
	try {
		dispatch({ type: ' ALL_CAR_REQUEST' });

		const { data } = await axios.get('/api/cars/getAllCars');

		dispatch({
			type: 'ALL_CAR_SUCCESS',
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: 'ALL_CAR_FAIL',
			payload: error.response.data.message,
		});
	}
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
	dispatch({ type: 'CLEAR_ERRORS' });
};
