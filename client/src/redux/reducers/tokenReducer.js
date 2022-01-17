export const tokenReducer = (state = '', action = {}) => {
	switch (action.type) {
		case 'GET_TOKEN_SUCCESS':
			return action.payload;
		case 'GET_TOKEN_FAIL':
			return state;
		default:
			return state;
	}
};
