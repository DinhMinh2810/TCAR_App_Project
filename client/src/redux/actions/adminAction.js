import axios from 'axios';

// get All Users -- Admin
export const allAccUsers = () => async (dispatch) => {
	try {
		dispatch({ type: 'ALL_USERS_REQUEST' });
		const { data } = await axios.get(`/api/admin/getAllAccount`);

		dispatch({ type: 'ALL_USERS_SUCCESS', payload: data });
	} catch (error) {
		dispatch({ type: 'ALL_USERS_FAIL', payload: error.response.data.message });
	}
};

export const getAllAccStaff = () => async (dispatch) => {
	try {
		dispatch({ type: 'ACC_STAFF_REQUEST' });

		const res = await axios.get('/api/admin/getAccountStaff');

		dispatch({ type: 'ACC_STAFF_SUCCESS', payload: res.data });
	} catch (error) {
		dispatch({
			type: 'ACC_STAFF_FAIL',
			payload: error.response.data.message,
		});
	}
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
	dispatch({ type: 'CLEAR_ERRORS' });
};
