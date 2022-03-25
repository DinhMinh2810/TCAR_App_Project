export const carsReducer = (state = { cars: [] }, action) => {
	switch (action.type) {
		case 'ALL_CAR_REQUEST':
		case 'ADMIN_CAR_REQUEST':
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
		case 'ADMIN_CAR_SUCCESS':
			return {
				loading: false,
				cars: action.payload,
			};
		case 'ALL_CAR_FAIL':
		case 'ADMIN_CAR_FAIL':
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

export const newCarReducer = (state = { car: {} }, action) => {
	switch (action.type) {
		case 'NEW_CAR_REQUEST':
			return {
				...state,
				loading: true,
			};
		case 'NEW_CAR_SUCCESS':
			return {
				loading: false,
				success: action.payload.success,
				car: action.payload.car,
			};
		case 'NEW_CAR_FAIL':
			return {
				...state,
				loading: false,
				error: true,
			};
		case 'NEW_CAR_RESET':
			return {
				...state,
				success: false,
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

export const updateOrDeleteCarReducer = (state = {}, action) => {
	switch (action.type) {
		case 'DELETE_CAR_REQUEST':
		case 'UPDATE_CAR_REQUEST':
			return {
				...state,
				loading: true,
			};
		case 'DELETE_CAR_SUCCESS':
			return {
				...state,
				loading: false,
				isDeleted: action.payload,
			};
		case 'UPDATE_CAR_SUCCESS':
			return {
				...state,
				loading: false,
				isUpdated: action.payload,
			};
		case 'DELETE_CAR_FAIL':
		case 'UPDATE_CAR_FAIL':
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		case 'DELETE_CAR_RESET':
			return {
				...state,
				isDeleted: false,
			};
		case 'UPDATE_CAR_RESET':
			return {
				...state,
				isUpdated: false,
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

export const assignCarReducer = (state = { car: {} }, action) => {
	switch (action.type) {
		case 'ASSIGN_CAR_REQUEST':
		case 'REMOVE_ASSIGN_CAR_REQUEST':
			return {
				...state,
				loading: true,
			};
		case 'ASSIGN_CAR_SUCCESS':
			return {
				loading: false,
				success: action.payload.success,
				car: action.payload.car,
			};
		case 'REMOVE_ASSIGN_CAR_SUCCESS':
			return {
				...state,
				loading: false,
				isRemoved: action.payload,
			};
		case 'ASSIGN_CAR_FAIL':
		case 'REMOVE_ASSIGN_CAR_FAIL':
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		case 'REMOVE_ASSIGN_CAR_RESET':
			return {
				...state,
				isRemoved: false,
			};
		case 'ASSIGN_CAR_RESET':
			return {
				...state,
				success: false,
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

export const createReviewReducer = (state = {}, action) => {
	switch (action.type) {
		case 'CREATE_REVIEW_REQUEST':
			return {
				...state,
				loading: true,
			};
		case 'CREATE_REVIEW_SUCCESS':
			return {
				loading: false,
				success: action.payload,
			};
		case 'CREATE_REVIEW_FAIL':
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		case 'CREATE_REVIEW_RESET':
			return {
				...state,
				success: false,
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

export const carReviewsReducer = (state = { reviews: [] }, action) => {
	switch (action.type) {
		case 'ALL_REVIEW_REQUEST':
			return {
				...state,
				loading: true,
			};
		case 'ALL_REVIEW_SUCCESS':
			return {
				loading: false,
				reviews: action.payload,
			};
		case 'ALL_REVIEW_FAIL':
			return {
				...state,
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

export const deleteReviewReducer = (state = {}, action) => {
	switch (action.type) {
		case 'DELETE_REVIEW_REQUEST':
			return {
				...state,
				loading: true,
			};
		case 'DELETE_REVIEW_SUCCESS':
			return {
				...state,
				loading: false,
				isDeleted: action.payload,
			};
		case 'DELETE_REVIEW_FAIL':
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		case 'DELETE_REVIEW_RESET':
			return {
				...state,
				isDeleted: false,
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
