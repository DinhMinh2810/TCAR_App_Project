import React, { useState, useEffect } from 'react';
import Loader from '../Layout/Loader/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { getSender } from './ChatLogic';
import { allChatOfUser } from './../../redux/actions/chatAction';
import { ChatState } from '../Context/ChatProvider';

const MyChatRecent = ({ fetchAgain }) => {
	const [loggedUser, setLoggedUser] = useState();
	const { selectedChat, setSelectedChat, chats, setChats } = ChatState();
	const { user: userIsLoggedIn } = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	const { loading: loadingChatOfUser, users: chatOfUser } = useSelector(
		(state) => state.allChatOfUser
	);

	useEffect(() => {
		dispatch(allChatOfUser());

		setLoggedUser(userIsLoggedIn);
	}, [dispatch, userIsLoggedIn, fetchAgain]);

	return (
		<div className="flex flex-col space-y-1 mt-3 -mx-2 h-48 overflow-y-auto">
			{loadingChatOfUser ? (
				<Loader />
			) : (
				<>
					{chatOfUser ? (
						chatOfUser?.map((user, index) => (
							<button
								className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2 divide-stone-300 border"
								key={index}
								onClick={() => setSelectedChat(user)}
							>
								{!user?.isGroupChat ? (
									<>
										<img
											className="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full"
											src={user?.users[1]?.avatar.url}
											alt=""
										/>
										<div className="ml-2 text-sm font-semibold">
											{getSender(loggedUser, user?.users)}
										</div>
									</>
								) : (
									<>
										<img
											className="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full"
											src="https://extinctionrebellion.nz/wp-content/uploads/2019/07/FacebookGroupsIcon.png"
											alt=""
										/>
										<div className="ml-2 text-sm font-semibold">
											{user?.chatName}
										</div>
									</>
								)}
							</button>
						))
					) : (
						<h1 className="text-2xl font-bold text-center text-gray-800 dark:text-white ">
							Not users 🤗
						</h1>
					)}
				</>
			)}
		</div>
	);
};

export default MyChatRecent;
