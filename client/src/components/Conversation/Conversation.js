import './conversation.css';

import axios from 'axios';
import { useEffect, useState } from 'react';

const Conversation = ({ conversation, currentUser }) => {
	const [user, setUser] = useState(null);

	useEffect(() => {
		const getUser = async () => {
			try {
				const { data } = await axios(
					`/api/conversation/userDetailAllChat/${conversation.members[1]}`
				);
				setUser(data);
			} catch (err) {
				console.log(err);
			}
		};
		getUser();
	}, [currentUser, conversation]);

	return (
		<div className="conversation">
			<img className="conversationImg" src={user?.avatar} alt="" />
			<span className="conversationName">{user?.name}</span>
		</div>
	);
};

export default Conversation;
