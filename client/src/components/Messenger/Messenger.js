import { useContext, useEffect, useRef, useState } from 'react';
import './Messenger.css';
import axios from 'axios';
import Conversation from '../Conversation/Conversation';
import MessengeC from './MessengeC/MessengeC';
import ChatOnline from './ChatOnline/ChatOnline';
import { useSelector } from 'react-redux';
// import { io } from 'socket.io-client';
const io = require('socket.io-client');
const Messenger = () => {
	const [conversations, setConversations] = useState([]);
	const [currentChat, setCurrentChat] = useState(null);
	const [messages, setMessages] = useState([]);
	const [newMessage, setNewMessage] = useState('');
	const [arrivalMessage, setArrivalMessage] = useState(null);
	const { user } = useSelector((state) => state.auth);
	const socket = useRef();
	const scrollRef = useRef();

	useEffect(() => {
		socket.current = io('http://localhost:8900');
		socket.current.on('getMessage', (data) => {
			setArrivalMessage({
				sender: data.senderId,
				content: data.content,
				createdAt: Date.now(),
			});
		});
	}, []);

	useEffect(() => {
		arrivalMessage &&
			currentChat?.members.includes(arrivalMessage.sender) &&
			setMessages((prev) => [...prev, arrivalMessage]);
	}, [arrivalMessage, currentChat]);

	useEffect(() => {
		const getConversations = async () => {
			try {
				const { data } = await axios.get(`/api/conversation/${user?._id}`);
				setConversations(data);
			} catch (err) {
				console.log(err);
			}
		};
		getConversations();
	}, [user._id]);

	useEffect(() => {
		const getMessages = async () => {
			try {
				const res = await axios.get(
					`/api/conversation/message/${currentChat?._id}`
				);
				setMessages(res.data);
			} catch (err) {
				console.log(err);
			}
		};
		getMessages();
	}, [currentChat]);


	const handleSubmit = async (e) => {
		e.preventDefault();
		const message = {
			sender: user._id,
			content: newMessage,
			conversationId: currentChat._id,
		};

		const receiverId = currentChat.members.find(
			(member) => member !== user._id
		);

		socket.current.emit('sendMessage', {
			senderId: user._id,
			receiverId,
			content: newMessage,
		});

		try {
			const res = await axios.post('/api/conversation/createMessage', message);
			setMessages([...messages, res.data]);
			setNewMessage('');
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
	}, [messages]);

	return (
		<>
			<div className="messenger">
				<div className="chatMenu">
					<div className="chatMenuWrapper">
						<input placeholder="Search for friends" className="chatMenuInput" />
						{conversations.map((c) => (
							<div key={c?._id} onClick={() => setCurrentChat(c)}>
								<Conversation conversation={c} currentUser={user} />
							</div>
						))}
					</div>
				</div>
				<div className="chatBox">
					<div className="chatBoxWrapper">
						<div className="chatBoxTop">
							{currentChat ? (
								<>
									<div className="chatBoxTop">
										{messages.map((m) => (
											<div ref={scrollRef} key={m?._id}>
												<MessengeC message={m} own={m.sender === user._id} />
											</div>
										))}
									</div>
									<div className="chatBoxBottom">
										<textarea
											className="chatMessageInput"
											placeholder="write something..."
											onChange={(e) => setNewMessage(e.target.value)}
											value={newMessage}
										></textarea>
										<button className="chatSubmitButton" onClick={handleSubmit}>
											Send
										</button>
									</div>
								</>
							) : (
								<span className="noConversationText">
									Open a conversation to start a chat.
								</span>
							)}
						</div>
					</div>
				</div>
				<div className="chatOnline">
					<div className="chatOnlineWrapper">
						{/* <ChatOnline
							onlineUsers={onlineUsers}
							currentId={user._id}
							setCurrentChat={setCurrentChat}
						/> */}
						{/* <ChatOnline /> */}
					</div>
				</div>
			</div>
		</>
	);
};

export default Messenger;
