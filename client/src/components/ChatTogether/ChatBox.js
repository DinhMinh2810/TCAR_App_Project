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
import { getSender } from './ChatLogic';
import { ChatState } from '../Context/ChatProvider';

const ChatBox = ({ fetchAgain, setFetchAgain }) => {
	const [loggedUser, setLoggedUser] = useState();
	const { selectedChat } = ChatState();
	const { user: userIsLoggedIn } = useSelector((state) => state.auth);
	const { chat } = useSelector((state) => state.chatDetail);
	const dispatch = useDispatch();

	// useEffect(() => {
	// 	dispatch(allChatOfUser());
	// 	setLoggedUser(userIsLoggedIn);
	// }, [dispatch, userIsLoggedIn]);

	return (
		<>
			<SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
		</>
	);
};

export default ChatBox;
