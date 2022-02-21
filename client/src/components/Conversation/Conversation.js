import './conversation.css';

import axios from 'axios';
import { useEffect, useState } from 'react';

const Conversation = ({ conversation, currentUser }) => {
	const [user, setUser] = useState(null);
	// useEffect(() => {
	// 	const getUser = async () => {
	// 		try {
	// 			const res = await axios('/api/conversation/');
	// 			setUser(res.data);
	// 		} catch (err) {
	// 			console.log(err);
	// 		}
	// 	};
	// 	getUser();
	// }, [currentUser, conversation]);
	return (
		<div className="conversation">
			<img className="conversationImg" src="" alt="" />
			<span className="conversationName">ss</span>
		</div>
	);
};

export default Conversation;
