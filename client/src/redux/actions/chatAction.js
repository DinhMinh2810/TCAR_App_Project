import axios from 'axios';

// Get all car -- Admin
export const allUserChat =
	(search = '') =>
	async (dispatch) => {
		try {
			dispatch({ type: 'ALL_USERS_CHAT_REQUEST' });

			const { data } = await axios.get(
				`/api/chat/allUsersChat?search=${search}`
			);
			dispatch({
				type: 'ALL_USERS_CHAT_SUCCESS',
				payload: data,
			});
		} catch (error) {
			dispatch({
				type: 'ALL_USERS_CHAT_FAIL',
				payload: error.response.data.message,
			});
		}
	};

export const accessChat = (userId) => async (dispatch) => {
	try {
		const config = {
			headers: { 'Content-Type': 'application/json' },
		};
		dispatch({ type: 'ALL_USERS_CHAT_RECENT_REQUEST' });

		const { data } = await axios.post(
			`/api/chat/accessChat`,
			{ userId },
			config
		);
		dispatch({
			type: 'ALL_USERS_CHAT_RECENT_SUCCESS',
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: 'ALL_USERS_CHAT_RECENT_FAIL',
			payload: error.response.data.message,
		});
	}
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
	dispatch({ type: 'CLEAR_ERRORS' });
};
