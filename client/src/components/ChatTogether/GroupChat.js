import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions } from '@mui/material';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { useSelector, useDispatch } from 'react-redux';
import {
	allChatOfUser,
	allUserChat,
	clearErrors,
	createGroupChat,
} from './../../redux/actions/chatAction';
import Loader from '../Layout/Loader/Loader';
import { toast } from 'react-toastify';
import SearchIcon from '@mui/icons-material/Search';
import UserListItemAdd from './UserListItemAdd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const GroupChat = () => {
	const [open, setOpen] = useState(false);
	const [search, setSearch] = useState('');
	const { loading, users } = useSelector((state) => state.allUserChat);
	const { success: successCreate, error } = useSelector(
		(state) => state.createGroupChat
	);
	const [selectedUsers, setSelectedUsers] = useState([]);
	const [groupChatName, setGroupChatName] = useState();

	const dispatch = useDispatch();

	useEffect(() => {
		if (error) {
			toast.error('Create not successful !! Duplicate car !!');
			dispatch(clearErrors());
		}

		if (successCreate) {
			toast.success('Create group successful !!');

			setOpen(false);
		}
		dispatch(allUserChat());
	}, [dispatch, successCreate, error]);

	const handleSearch = () => {
		if (!search) {
			dispatch(allUserChat());
		}
		dispatch(allUserChat(search));
	};

	const handleGroup = (userToAdd) => {
		if (selectedUsers.includes(userToAdd)) {
			toast.error('User already added !!');
			return;
		}

		setSelectedUsers([...selectedUsers, userToAdd]);
	};

	const handleDelete = (delUser) => {
		setSelectedUsers(selectedUsers.filter((sel) => sel._id !== delUser._id));
		toast.success('Remove this user successfully !!');
	};

	const createGroupChatSubmit = async () => {
		dispatch(createGroupChat(groupChatName, selectedUsers));
	};

	const submitReviewToggle = () => {
		open ? setOpen(false) : setOpen(true);
	};

	return (
		<div className="flex flex-row items-center justify-center h-12 w-full">
			<div className="flex items-center justify-center rounded-2xl 0 h-10 w-10">
				<GroupAddIcon />
			</div>

			<div
				className="ml-2 font-bold text-2xl cursor-pointer"
				onClick={submitReviewToggle}
			>
				Create a new group message
			</div>
			<Dialog
				aria-labelledby="simple-dialog-title"
				open={open}
				onClose={submitReviewToggle}
			>
				<div className="flex items-center justify-center py-10 px-20">
					<div className="bg-white shadow-lg rounded px-12 pt-6 pb-8 mb-4">
						<div className="text-gray-800 text-2xl flex justify-center border-b-2 py-2 mb-4">
							Create a new group chat
						</div>
						<div className="mb-2">
							<label
								className="block text-gray-700 text-sm font-normal mb-2"
								htmlFor="password"
							>
								Chat name
							</label>
							<input
								onChange={(e) => setGroupChatName(e.target.value)}
								className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							/>
						</div>
						<div className="mb-2">
							<label
								className="block text-gray-700 text-sm font-normal mb-2"
								htmlFor="password"
							>
								Add user
							</label>
							<div className="flex items-center justify-between mt-3">
								<input
									className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
						</div>

						<div className="flex flex-col space-y-1 mt-2 -mx-2 h-14 overflow-y-auto">
							{selectedUsers.map((user) => (
								<UserListItemAdd
									key={user._id}
									user={user}
									handleFunction={() => handleDelete(user)}
								/>
							))}
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
												onClick={() => handleGroup(user)}
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

						<DialogActions className="flex items-center justify-evenly">
							<button
								onClick={submitReviewToggle}
								className="px-3 py-2 rounded text-white inline-block shadow-lg bg-red-500 hover:bg-red-600 focus:bg-blue-700"
							>
								Cancel
							</button>
							<button
								onClick={createGroupChatSubmit}
								className="px-3 py-2 rounded text-white inline-block shadow-lg bg-blue-500 hover:bg-blue-600 focus:bg-blue-700"
							>
								Create group
							</button>
						</DialogActions>
					</div>
				</div>
			</Dialog>
		</div>
	);
};

export default GroupChat;
