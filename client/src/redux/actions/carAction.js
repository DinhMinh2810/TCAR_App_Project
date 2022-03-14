import axios from 'axios';

// Get all car -- Admin
export const getAdminCar = () => async (dispatch) => {
	try {
		dispatch({ type: 'ADMIN_CAR_REQUEST' });

		const { data } = await axios.get('/api/cars/getAdAllCars');

		dispatch({
			type: 'ADMIN_CAR_SUCCESS',
			payload: data.cars,
		});
	} catch (error) {
		dispatch({
			type: 'ADMIN_CAR_FAIL',
			payload: error.response.data.message,
		});
	}
};

// Get All car products
export const getCars =
	(
		keyword = '',
		StartDay = '',
		EndDay = '',
		currentPage = 1,
		rentPerDay = [0, 9000],
		seatsCategory,
		ratings = 0,
		refreshSearch
	) =>
	async (dispatch) => {
		try {
			dispatch({ type: ' ALL_CAR_REQUEST' });
			let URL = `/api/cars/getAllCars?location=${keyword}&startDay=${StartDay}&endDay=${EndDay}&page=${currentPage}&rentPerDay[gte]=${rentPerDay[0]}&rentPerDay[lte]=${rentPerDay[1]}&ratings[gte]=${ratings}`;

			if (seatsCategory) {
				URL = `/api/cars/getAllCars?location=${keyword}&startDay=${StartDay}&endDay=${EndDay}&page=${currentPage}&rentPerDay[gte]=${rentPerDay[0]}&rentPerDay[lte]=${rentPerDay[1]}&seatsCategory=${seatsCategory}&ratings[gte]=${ratings}`;
			}

			if (refreshSearch === true) {
				URL = `/api/cars/getAllCars?location=${keyword}&page=${currentPage}&rentPerDay[gte]=${rentPerDay[0]}&rentPerDay[lte]=${rentPerDay[1]}&ratings[gte]=${ratings}`;
			}

			if (refreshSearch === true && seatsCategory) {
				URL = `/api/cars/getAllCars?location=${keyword}&startDay=${StartDay}&endDay=${EndDay}&page=${currentPage}&rentPerDay[gte]=${rentPerDay[0]}&rentPerDay[lte]=${rentPerDay[1]}&seatsCategory=${seatsCategory}&ratings[gte]=${ratings}`;
			}

			const { data } = await axios.get(URL);

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

// Get Car Details
export const getCarDetails = (id) => async (dispatch) => {
	try {
		dispatch({ type: 'CAR_DETAILS_REQUEST' });

		const { data } = await axios.get(`/api/cars/getDetailCar/${id}`);

		dispatch({
			type: 'CAR_DETAILS_SUCCESS',
			payload: data.car,
		});
	} catch (error) {
		dispatch({
			type: 'CAR_DETAILS_FAIL',
			payload: error.response.data.message,
		});
	}
};

// Create new car -- Admin
export const createCar = (formData) => async (dispatch) => {
	try {
		dispatch({ type: 'NEW_CAR_REQUEST' });

		const config = { headers: { 'Content-Type': 'application/json' } };

		const { data } = await axios.post(`/api/cars/create`, formData, config);

		dispatch({
			type: 'NEW_CAR_SUCCESS',
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: 'NEW_CAR_FAIL',
			payload: error.response.data.message,
		});
	}
};

// Update car -- Admin
export const updateCar = (id, formData) => async (dispatch) => {
	try {
		dispatch({ type: 'UPDATE_CAR_REQUEST ' });

		const config = {
			headers: { 'Content-Type': 'application/json' },
		};

		const { data } = await axios.put(
			`/api/cars/update/${id}`,
			formData,
			config
		);

		dispatch({
			type: 'UPDATE_CAR_SUCCESS',
			payload: data.success,
		});
	} catch (error) {
		dispatch({
			type: 'UPDATE_CAR_FAIL',
			payload: error.response.data.message,
		});
	}
};

// Delete car -- Admin
export const deleteCar = (id) => async (dispatch) => {
	try {
		dispatch({ type: 'DELETE_CAR_REQUEST' });

		const { data } = await axios.delete(`/api/cars/delete/${id}`);

		dispatch({
			type: 'DELETE_CAR_SUCCESS',
			payload: data.message,
		});
	} catch (error) {
		dispatch({
			type: 'DELETE_CAR_FAIL',
			payload: error.response.data.message,
		});
	}
};

// assign car -- Staff
export const assignCar = (carId, userId) => async (dispatch) => {
	try {
		dispatch({ type: 'ASSIGN_CAR_REQUEST' });

		const config = { headers: { 'Content-Type': 'application/json' } };

		const { data } = await axios.post(
			`/api/cars/assign`,
			{ carId, userId },
			config
		);

		dispatch({
			type: 'ASSIGN_CAR_SUCCESS',
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: 'ASSIGN_CAR_FAIL',
			payload: error.response.data.message,
		});
	}
};

// Remove assign car -- Staff
export const removeAssignCar = (id) => async (dispatch) => {
	try {
		dispatch({ type: 'REMOVE_ASSIGN_CAR_REQUEST' });

		const { data } = await axios.delete(`/api/cars/removeAssign/${id}`);

		dispatch({
			type: 'REMOVE_ASSIGN_CAR_SUCCESS',
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: 'REMOVE_ASSIGN_CAR__FAIL',
			payload: error.response.data.message,
		});
	}
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
	dispatch({ type: 'CLEAR_ERRORS' });
};
