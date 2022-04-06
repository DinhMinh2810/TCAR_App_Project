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

export const allUserChatAccessReducer = (state = { users: [] }, action) => {
	switch (action.type) {
		case 'ALL_USERS_CHAT_RECENT_REQUEST':
			return {
				...state,
				loading: true,
			};

		case 'ALL_USERS_CHAT_RECENT_SUCCESS':
			return {
				...state,
				loading: false,
				users: action.payload.users,
				success: action.payload.success,
			};

		case 'ALL_USERS_CHAT_RECENT_FAIL':
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		case 'ALL_USERS_CHAT_RECENT_RESET':
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

export const allChatOfUserReducer = (state = { users: [] }, action) => {
	switch (action.type) {
		case 'ALL_CHAT_OF_USER_REQUEST':
			return {
				...state,
				loading: true,
			};

		case 'ALL_CHAT_OF_USER_SUCCESS':
			return {
				...state,
				loading: false,
				users: action.payload.users,
				success: action.payload.success,
			};

		case 'ALL_CHAT_OF_USER_FAIL':
			return {
				...state,
				loading: false,
				error: action.payload,
			};

		case 'ALL_CHAT_OF_USER_RESET':
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

export const chatDetailReducer = (state = { chat: [] }, action) => {
	switch (action.type) {
		case 'CHAT_DETAIL_REQUEST':
			return {
				...state,
				loading: true,
			};

		case 'CHAT_DETAIL_SUCCESS':
			return {
				...state,
				loading: false,
				chat: action.payload.chat,
				success: action.payload.success,
			};

		case 'CHAT_DETAIL_FAIL':
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

export const createGroupChatReducer = (state = {}, action) => {
	switch (action.type) {
		case 'CREATE_GROUP_REQUEST':
			return {
				...state,
				loading: true,
			};
		case 'CREATE_GROUP_SUCCESS':
			return {
				loading: false,
				success: action.payload,
			};
		case 'CREATE_GROUP_FAIL':
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		case 'CREATE_GROUP_RESET':
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
