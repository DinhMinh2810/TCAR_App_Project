import React, { useState } from 'react';
import { ChatState } from '../Context/ChatProvider';
import Loader from '../Layout/Loader/Loader';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

const UpdateGroupChat = ({
	fetchMessages,
	fetchAgain,
	setFetchAgain,
	handleFunction,
}) => {
	const [groupChatName, setGroupChatName] = useState();
	const [search, setSearch] = useState('');
	const [searchResult, setSearchResult] = useState([]);
	const [loading, setLoading] = useState(false);
	const [renameloading, setRenameLoading] = useState(false);
	const { selectedChat, setSelectedChat } = ChatState();
	const { user } = useSelector((state) => state.auth);

	const handleSearch = async (query) => {
		setSearch(query);
		if (!query) {
			return;
		}

		try {
			setLoading(true);
			const { data } = await axios.get(
				`/api/chat/allUsersChat?search=${search}`
			);
			setLoading(false);
			setSearchResult(data.users);
		} catch (error) {
			toast.error('Failed to load search results !!');
			setLoading(false);
		}
	};

	const handleAddUserGroup = async (user1) => {
		if (selectedChat.users.find((u) => u._id === user1._id)) {
			toast.error('User already in this group !!');
			return;
		}

		try {
			setLoading(true);
			const config = {
				headers: { 'Content-Type': 'application/json' },
			};
			const { data } = await axios.put(
				`/api/chat/addUserToGroup`,
				{
					chatId: selectedChat._id,
					userId: user1._id,
				},
				config
			);

			setSelectedChat(data);
			setFetchAgain(!fetchAgain);
			setLoading(false);
			toast.success('Add this user to group successfully !!');
		} catch (error) {
			toast.error('Add this user to group fail !!');
			setLoading(false);
		}
		setGroupChatName('');
	};

	const handleRename = async () => {
		if (!groupChatName) return;

		try {
			setRenameLoading(true);

			const config = {
				headers: { 'Content-Type': 'application/json' },
			};
			const { data } = await axios.put(
				`/api/chat/renameGroup`,
				{
					chatId: selectedChat._id,
					chatName: groupChatName,
				},
				config
			);

			handleFunction();
			setSelectedChat(data);
			setFetchAgain(!fetchAgain);
			setRenameLoading(false);
			toast.success('Update name group chat successfully !!');
		} catch (error) {
			toast.error('Cannot edit chat name group !!');
			setRenameLoading(false);
		}
		setGroupChatName('');
	};

	const handleRemove = async (user1) => {
		try {
			setLoading(true);
			const config = {
				headers: { 'Content-Type': 'application/json' },
			};
			const { data } = await axios.put(
				`/api/chat/removeUserFromGroup`,
				{
					chatId: selectedChat._id,
					userId: user1._id,
				},
				config
			);
			if (user1._id === user._id) {
				setSelectedChat();
			} else {
				setSelectedChat(data);
			}

			setFetchAgain(!fetchAgain);
			fetchMessages();
			setLoading(false);
			toast.success('Remove this user from group successfully !!');
		} catch (error) {
			setLoading(false);
		}
		setGroupChatName('');
	};

	return (
		<div className="bg-white w-full justify-center items-center overflow-hidden md:max-w-sm rounded-lg shadow-sm mx-auto">
			<div className="mt-6 mb-2">
				<h1 className="text-lg text-center font-semibold">
					Group name: {selectedChat.chatName}
				</h1>
			</div>
			<div className="mt-3 pt-3 flex flex-wrap mx-6 border-t">
				<label className="block" htmlFor="email">
					Update group name
				</label>
				<input
					type="text"
					value={groupChatName}
					onChange={(e) => setGroupChatName(e.target.value)}
					className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
				/>
				<button
					type="submit"
					className="w-full px-6 py-2 mt-2 text-white bg-blue-600 rounded-lg hover:bg-blue-900"
					onClick={handleRename}
				>
					Update
				</button>
			</div>

			<div className="mt-3 pt-3 flex flex-wrap mx-6 border-t">
				<div className="flex flex-col space-y-1-mx-2 h-20 overflow-y-auto">
					{selectedChat.users.map((user) => (
						<div
							key={user._id}
							className="text-xs mr-2 my-1 uppercase tracking-wider border px-2 text-indigo-600 border-indigo-600 hover:bg-indigo-600 hover:text-indigo-100 cursor-default"
						>
							<p>
								{user.name}
								<span onClick={() => handleRemove(user)}>(Remove)</span>
							</p>
						</div>
					))}
				</div>
			</div>
			<div className="mt-3 pt-3 flex flex-wrap mx-6 border-t">
				<label className="block" htmlFor="email">
					Add user to group
				</label>
				<div className="flex">
					<input
						type="text"
						placeholder="Please enter email or username"
						className="px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
						onChange={(e) => handleSearch(e.target.value)}
					/>
					<button
						type="submit"
						className=" px-6 py-2 mt-2 ml-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900"
					>
						Search
					</button>
				</div>
			</div>
			<div className="flex flex-col space-y-1 mt-3 -mx-2 h-20 overflow-y-auto px-8">
				{loading ? (
					<Loader />
				) : (
					searchResult?.map((user) => (
						<button
							className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2 divide-stone-300 border"
							key={user._id}
							onClick={() => handleAddUserGroup(user)}
						>
							<img
								className="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full"
								src={user.avatar.url}
								alt=""
							/>
							<div className="ml-2 flex-col flex items-start">
								<div className="text-sm font-semibold">{user.name}</div>
								<div className="text-xs font-medium">{user.email}</div>
							</div>
						</button>
					))
				)}
			</div>
		</div>
	);
};

export default UpdateGroupChat;
