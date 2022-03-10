import axios from 'axios';

// Get all account staff - Admin
export const getAllAccDriver = () => async (dispatch) => {
	try {
		dispatch({ type: 'ACC_DRIVER_REQUEST' });

		const res = await axios.get('/api/staff/getAccountDriver');

		dispatch({ type: 'ACC_DRIVER_SUCCESS', payload: res.data });
	} catch (error) {
		dispatch({
			type: 'ACC_DRIVER_FAIL',
			payload: error.response.data.message,
		});
	}
};
