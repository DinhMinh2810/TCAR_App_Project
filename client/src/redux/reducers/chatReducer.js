export const allUserChatReducer = (state = { users: [] }, action) => {
	switch (action.type) {
		case 'ALL_USERS_CHAT_REQUEST':
			return {
				...state,
				loading: true,
			};
		case 'ALL_USERS_CHAT_SUCCESS':
			return {
				...state,
				loading: false,
				users: action.payload.users,
			};

		case 'ALL_USERS_CHAT_FAIL':
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
