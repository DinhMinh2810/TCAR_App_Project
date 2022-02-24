const initialState = { messages: [] };
export const chatBotReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'SAVE_MESSAGE':
			return {
				...state,
				messages: state.messages.concat(action.payload),
			};
		default:
			return state;
	}
};
