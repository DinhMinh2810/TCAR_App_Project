import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
	accessChat,
	allChatOfUser,
	chatDetail,
} from '../../redux/actions/chatAction';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import SingleChat from './SingleChat';

const ChatBox = ({ userIDChat }) => {
	const { user } = useSelector((state) => state.auth);
	const { chat } = useSelector((state) => state.chatDetail);
	const dispatch = useDispatch();


	// useEffect(() => {
	// 	dispatch(chatDetail(userIDChat));
	// }, [dispatch, userIDChat]);

	useEffect(() => {
		dispatch(allChatOfUser());
		// eslint-disable-next-line
	}, []);

	return (
		<>
			<SingleChat  />
		</>
	);
};

export default ChatBox;
