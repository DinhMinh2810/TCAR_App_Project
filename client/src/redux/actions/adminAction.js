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

// Update role user
export const updateRoleUser = (id, role) => async (dispatch) => {
	try {
		dispatch({ type: 'UPDATE_USER_REQUEST' });

		const config = { headers: { 'Content-Type': 'application/json' } };

		const { data } = await axios.put(
			`/api/admin/updateUserRole/${id}`,
			role,
			config
		);

		dispatch({ type: 'UPDATE_USER_SUCCESS', payload: data.success });
	} catch (error) {
		dispatch({
			type: 'UPDATE_USER_FAIL',
			payload: error.response.data.message,
		});
	}
};

// Delete account user
export const deleteAccUser = (id) => async (dispatch) => {
	try {
		dispatch({ type: 'DELETE_USER_REQUEST' });

		const { data } = await axios.delete(`/api/admin/deleteAccUser/${id}`);

		dispatch({ type: 'DELETE_USER_SUCCESS', payload: data });
	} catch (error) {
		dispatch({
			type: 'DELETE_USER_FAIL',
			payload: error.response.data.message,
		});
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
