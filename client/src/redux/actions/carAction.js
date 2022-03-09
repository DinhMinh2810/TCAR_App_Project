import axios from 'axios';

// Get All car products
export const getCars =
	(keyword = '', currentPage = 1, rentPerDay = [0, 600000]) =>
	async (dispatch) => {
		try {
			dispatch({ type: ' ALL_CAR_REQUEST' });

			let URL = `/api/cars/getAllCars?keyword=${keyword}&page=${currentPage}&rentPerDay[gte]=${rentPerDay[0]}&rentPerDay[lte]=${rentPerDay[1]}`;
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

// Create new car
export const createCar = (formData) => async (dispatch) => {
	try {
		dispatch({ type: 'NEW_CAR_REQUEST' });

		const config = { headers: { 'Content-Type': 'application/json' } };

		const { data } = await axios.post(`/api/cars/create`, formData, config);
		console.log(data);

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

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
	dispatch({ type: 'CLEAR_ERRORS' });
};
