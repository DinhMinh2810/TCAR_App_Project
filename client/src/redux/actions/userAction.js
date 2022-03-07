import axios from 'axios';

// Update Password
export const changePasswordUser = (formData) => async (dispatch) => {
	try {
		dispatch({ type: 'UPDATE_PASSWORD_REQUEST' });

		const config = { headers: { 'Content-Type': 'application/json' } };

		const { data } = await axios.put(`/api/changePassword`, formData, config);

		dispatch({ type: 'UPDATE_PASSWORD_SUCCESS', payload: data });
	} catch (error) {
		dispatch({
			type: 'UPDATE_PASSWORD_FAIL',
			payload: error.response.data.message,
		});
	}
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
	dispatch({ type: 'CLEAR_ERRORS' });
};
