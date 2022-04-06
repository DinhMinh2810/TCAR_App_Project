import React from 'react';
import TitleBarPage from '../../Layout/TitleBarPage';
import HeaderBarAdmin from '../HeaderBarAdmin/HeaderBarAdmin';
import ChatPage from './../../ChatTogether/ChatPage';

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
