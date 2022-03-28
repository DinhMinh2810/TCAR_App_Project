import axios from 'axios';

// Get all driver not assign car - Staff
export const getDriverNotAssign =
	(currentPage = 1) =>
	async (dispatch) => {
		try {
			dispatch({ type: 'ACC_DRIVER_REQUEST' });

			const res = await axios.get(
				`/api/staff/getDriverNotAssign?page=${currentPage}`
			);

			dispatch({ type: 'ACC_DRIVER_SUCCESS', payload: res.data });
		} catch (error) {
			dispatch({
				type: 'ACC_DRIVER_FAIL',
				payload: error.response.data.message,
			});
		}
	};

// Get all account driver - Staff
export const getAllAccDriver =
	(currentPage = 1) =>
	async (dispatch) => {
		try {
			dispatch({ type: 'ACC_DRIVER_REQUEST' });

			const { data } = await axios.get(
				`/api/staff/getAccountDriver?page=${currentPage}`
			);

			dispatch({ type: 'ACC_DRIVER_SUCCESS', payload: data });
		} catch (error) {
			dispatch({
				type: 'ACC_DRIVER_FAIL',
				payload: error.response.data.message,
			});
		}
	};

// Create account driver - staff
export const createAccountDriver = (formData) => async (dispatch) => {
	try {
		dispatch({ type: 'CREATE_ACC_DRIVER_REQUEST' });
		const config = { headers: { 'Content-Type': 'multipart/form-data' } };

		const res = await axios.post(
			'/api/staff/createAccDriver',
			formData,
			config
		);

		dispatch({ type: 'CREATE_ACC_DRIVER_SUCCESS', payload: res.data });
	} catch (error) {
		dispatch({
			type: 'CREATE_ACC_DRIVER_FAIL',
			payload: error.response.data.message,
		});
	}
};

// Change password acc driver
export const changePasswordAccDriver = (id, password) => async (dispatch) => {
	try {
		dispatch({ type: 'UPDATE_PASSWORD_REQUEST' });

		const config = {
			headers: { 'Content-Type': 'application/json' },
		};

		const { data } = await axios.put(
			`/api/staff/changePWAccDriver/${id}`,
			{ password },
			config
		);

		dispatch({ type: 'UPDATE_PASSWORD_SUCCESS', payload: data.message });
	} catch (error) {
		dispatch({
			type: 'UPDATE_PASSWORD_FAIL',
			payload: error.response.data.message,
		});
	}
};

// Delete account user
export const deleteAccDriver = (id) => async (dispatch) => {
	try {
		dispatch({ type: 'DELETE_USER_REQUEST' });

		const res = await axios.delete(`/api/staff/deleteAccDriver/${id}`);

		dispatch({ type: 'DELETE_USER_SUCCESS', payload: res.data });
	} catch (error) {
		dispatch({
			type: 'DELETE_USER_FAIL',
			payload: error.response.data.message,
		});
	}
};
