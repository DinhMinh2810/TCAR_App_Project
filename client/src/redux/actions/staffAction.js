import axios from 'axios';

// Get all driver not assign car - Admin
export const getDriverNotAssign = () => async (dispatch) => {
	try {
		dispatch({ type: 'ACC_DRIVER_REQUEST' });

		const res = await axios.get('/api/staff/getDriverNotAssign');

		dispatch({ type: 'ACC_DRIVER_SUCCESS', payload: res.data });
	} catch (error) {
		dispatch({
			type: 'ACC_DRIVER_FAIL',
			payload: error.response.data.message,
		});
	}
};
