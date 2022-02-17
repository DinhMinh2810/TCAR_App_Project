export const carsReducer = (state = { cars: [] }, action) => {
	switch (action.type) {
		case 'ALL_CAR_REQUEST':
			return {
				loading: true,
				cars: [],
			};
		case 'ALL_CAR_SUCCESS':
			return {
				loading: false,
				cars: action.payload.cars,
				carsCount: action.payload.carsCount,
				resultItemPage: action.payload.resultItemPage,
			};
		case 'ALL_CAR_FAIL':
			return {
				loading: false,
				error: action.payload,
			};
		case 'CLEAR_ERRORS':
			return {
				...state,
				error: null,
			};
		default:
			return state;
	}
};

export const carDetailsReducer = (state = { car: {} }, action) => {
	switch (action.type) {
		case 'CAR_DETAILS_REQUEST':
			return {
				loading: true,
				...state,
			};
		case 'CAR_DETAILS_SUCCESS':
			return {
				loading: false,
				car: action.payload,
			};
		case 'CAR_DETAILS_FAIL':
			return {
				loading: false,
				error: action.payload,
			};

		case 'CLEAR_ERRORS':
			return {
				...state,
				error: null,
			};
		default:
			return state;
	}
};
