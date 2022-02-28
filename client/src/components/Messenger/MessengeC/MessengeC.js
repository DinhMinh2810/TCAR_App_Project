import React from 'react';
import './MessengeC.css';
import { format } from 'timeago.js';

const MessengeC = ({ message, own }) => {
	return (
		<div className={own ? 'message own' : 'message'}>
			<div className="messageTop">
				<img
					className="messageImg"
					src="https://images.pexels.com/photos/3686769/pexels-photo-3686769.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
					alt=""
				/>
				<p className="messageText">{message.content}</p>
			</div>
			<div className="messageBottom">{format(message.createdAt)}</div>
		</div>
	);
};

export default MessengeC;