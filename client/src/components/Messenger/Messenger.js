import { useContext, useEffect, useRef, useState } from 'react';
import './Messenger.css';
import axios from 'axios';
import Conversation from '../Conversation/Conversation';
import MessengeC from './MessengeC/MessengeC';
import ChatOnline from './ChatOnline/ChatOnline';
import { useSelector } from 'react-redux';

const Messenger = () => {
	const [conversations, setConversations] = useState([]);
	const { user } = useSelector((state) => state.auth);

	useEffect(() => {
		const getConversations = async () => {
			try {
				const { data } = await axios.get(`/api/conversation/${user._id}`);
				setConversations(data);
			} catch (err) {
				console.log(err);
			}
		};
		getConversations();
	}, [user._id]);

	return (
		<>
			<div className="messenger">
				<div className="chatMenu">
					<div className="chatMenuWrapper">
						{/* <input placeholder="Search for friends" className="chatMenuInput" />
						{conversations.map((c) => (
							<div onClick={() => setCurrentChat(c)}>
								<Conversation conversation={c} currentUser={user} />
							</div>
						))} */}
						<Conversation />
						<Conversation />
						<Conversation />
					</div>
				</div>
				<div className="chatBox">
					<div className="chatBoxWrapper">
						<div className="chatBoxTop">
							<MessengeC own={true} />
							<MessengeC />
							<MessengeC />
						</div>
						<div className="chatBoxBottom">
							<textarea
								className="chatMessageInput"
								placeholder="write something !!"
							/>
							<button className="chatSubmitButton">Send</button>
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
