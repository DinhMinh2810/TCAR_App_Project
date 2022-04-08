import axios from 'axios';
import { toast } from 'react-toastify';

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

export const createGroupChat =
	(groupChatName, selectedUsers) => async (dispatch) => {
		if (!groupChatName || !selectedUsers) {
			toast.success('Please fill all the feilds !!');
			return;
		}

		try {
			dispatch({ type: 'CREATE_GROUP_REQUEST' });
			const config = {
				headers: { 'Content-Type': 'application/json' },
			};
			const { data } = await axios.post(
				`/api/chat/createGroupChat`,
				{
					name: groupChatName,
					users: JSON.stringify(selectedUsers.map((u) => u._id)),
				},
				config
			);

			dispatch({
				type: 'CREATE_GROUP_SUCCESS',
				payload: data.success,
			});
		} catch (error) {
			dispatch({
				type: 'CREATE_GROUP_FAIL',
				payload: error.response.data.message,
			});
		}
	};

export const allChatOfUser = () => async (dispatch) => {
	try {
		dispatch({ type: 'ALL_CHAT_OF_USER_REQUEST' });

		const { data } = await axios.get(`/api/chat/allChatsOfUser`);

		dispatch({
			type: 'ALL_CHAT_OF_USER_SUCCESS',
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: 'ALL_CHAT_OF_USER_FAIL',
			payload: error.response.data.message,
		});
	}
};

export const chatDetail = (id) => async (dispatch) => {
	try {
		dispatch({ type: 'CHAT_DETAIL_REQUEST' });

		const { data } = await axios.get(`
		/api/chat/getChatDetail/${id}`);

		dispatch({
			type: 'CHAT_DETAIL_SUCCESS',
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: 'CHAT_DETAIL_FAIL',
			payload: error.response.data.message,
		});
	}
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
	dispatch({ type: 'CLEAR_ERRORS' });
};
