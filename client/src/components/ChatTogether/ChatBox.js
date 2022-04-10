import React from 'react';
import SingleChat from './SingleChat';

const ChatBox = ({ fetchAgain, setFetchAgain }) => {
	return (
		<>
			<SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
		</>
	);
};

export default ChatBox;
