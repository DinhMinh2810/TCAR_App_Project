import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
	accessChat,
	allChatOfUser,
	allUserChat,
} from './../../redux/actions/chatAction';
import SearchIcon from '@mui/icons-material/Search';
import Loader from '../Layout/Loader/Loader';
import axios from 'axios';
import ChatBox from './ChatBox';
import GroupChat from './GroupChat';
import { getSender } from './ChatLogic';
import MyChatRecent from './MyChatRecent';

const ChatPage = () => {
	const [search, setSearch] = useState('');
	const [selectedChat, setSelectedChat] = useState(false);
	const { loading, users } = useSelector((state) => state.allUserChat);

	const dispatch = useDispatch();
	const { loading: loadingChatOfUser, users: chatOfUser } = useSelector(
		(state) => state.allChatOfUser
	);
	const { success } = useSelector((state) => state.allUserChatAccess);
	const { success: successCreate, error } = useSelector(
		(state) => state.createGroupChat
	);

	useEffect(() => {
		dispatch(allUserChat());
		if (successCreate) {
			dispatch(allChatOfUser());
			dispatch({ type: 'CREATE_GROUP_RESET' });
		}
	}, [dispatch, successCreate, success]);

	const handleSearch = () => {
		if (!search) {
			toast.error('Please enter something in search !!');
			dispatch(allUserChat());
		}
		dispatch(allUserChat(search));
	};

	return (
		<>
			<div className="flex h-screen antialiased text-gray-800">
				<div className="flex flex-row h-full w-full overflow-x-hidden">
					<div className="flex flex-col py-8 pl-6 pr-2 w-64 bg-white flex-shrink-0">
						<GroupChat />
						<div className="flex flex-col mt-8">
							<div className="flex flex-row items-center justify-between text-xs">
								<span className="font-bold text-2xl">My chat</span>
								<span className="flex items-center justify-center bg-gray-300 h-4 w-4 p-3 rounded-full">
									7
								</span>
							</div>

							<MyChatRecent />

							<div className="flex flex-row items-center justify-between text-xs mt-6">
								<span className="font-bold text-2xl">Find users</span>
								<span className="flex items-center justify-center bg-gray-300 h-4 w-4 p-3 rounded-full">
									7
								</span>
							</div>
							<div className="flex items-center justify-between mt-3">
								<input
									className="border-1 border-gray-300 bg-white pl-2 h-10 rounded-lg text-sm focus:outline-none"
									placeholder="Search by name or email"
									value={search}
									onChange={(e) => setSearch(e.target.value)}
								/>
								<button
									className=" text-white bg-blue-500 hover:bg-blue-400 divide-slate-300 rounded px-2 py-1"
									onClick={handleSearch}
								>
									<SearchIcon />
								</button>
							</div>

							<div className="flex flex-col space-y-1 mt-3 -mx-2 h-48 overflow-y-auto">
								{loading ? (
									<Loader />
								) : (
									<>
										{users && users[0] ? (
											users?.map((user, index) => (
												<button
													className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2 divide-stone-300 border"
													key={index}
													onClick={() => dispatch(accessChat(user._id))}
												>
													<img
														className="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full"
														src={user.avatar.url}
														alt=""
													/>
													<div className="ml-2 flex-col flex items-start">
														<div className="text-sm font-semibold">
															{user.name}
														</div>
														<div className="text-xs font-medium">
															{user.email}
														</div>
													</div>
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
						</div>
					</div>
					<ChatBox />
				</div>
			</div>
		</>
	);
};

export default ChatPage;
