import React from 'react';
import HeaderBarStaff from './../HeaderBarStaff/HeaderBarStaff';
import TitleBarPage from './../../Layout/TitleBarPage';
import ChatPage from './../../ChatTogether/ChatPage';

const ChatStaff = () => {
	return (
		<>
			<div className="dashboard">
				<HeaderBarStaff />
				<TitleBarPage title="Chat Staff" />
				<ChatPage />
			</div>
		</>
	);
};

export default ChatStaff;
