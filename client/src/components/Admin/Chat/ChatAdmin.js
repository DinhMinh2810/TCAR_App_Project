import React from 'react';
import ChatPage from '../../ChatTogether/ChatPage';
import TitleBarPage from '../../Layout/TitleBarPage';
import HeaderBarAdmin from '../HeaderBarAdmin/HeaderBarAdmin';

const ChatAdmin = () => {
	return (
		<>
			<div className="dashboard">
				<HeaderBarAdmin />
				<TitleBarPage title="Manager all account" />
				<ChatPage />
			</div>
		</>
	);
};

export default ChatAdmin;
