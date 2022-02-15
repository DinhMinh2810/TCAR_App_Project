import axios from 'axios';

// Get All car Products
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

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
	dispatch({ type: 'CLEAR_ERRORS' });
};
