import React from 'react';
import { List, Avatar } from 'antd';
import Icon from '@ant-design/icons';
import { Link } from 'react-router-dom';

const MessageChatBot = (props) => {
	const AvatarSrc =
		props.who === 'bot' ? <Icon type="robot" /> : <Icon type="smile" />;
	return (
		<List.Item style={{ padding: '1rem' }}>
			<List.Item.Meta
				avatar={<Avatar icon={AvatarSrc} />}
				title={props.who}
				description={props.text}
			/>
			<Link to="/messenger">About</Link>
		</List.Item>
	);
};

export default MessageChatBot;
