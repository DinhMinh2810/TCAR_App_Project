import React, { useEffect } from 'react';
import './chatbot.css';
import MarkUnreadChatAltIcon from '@mui/icons-material/MarkUnreadChatAlt';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { saveMessage } from './../../../redux/actions/chatbotAction';

const ChatBot = () => {
	const dispatch = useDispatch();
	const { messages } = useSelector((state) => state.chatbot);

	const chatModal = document.querySelector('.chat-modal');
	const chatServices = document.querySelector('.chat-services');
	const showChat = document.querySelector('.show-chat');

	useEffect(() => {
		userSendFrequentlyAskEvent('WelcomeToTCAR');
	}, []);

	const showChatBot = (e) => {
		chatModal.classList.add('show');
		showChat.classList.add('hidden');
		setTimeout(async () => {
			await chatServices.classList.add('expand');
		}, 500);
	};

	const closeChatBot = (e) => {
		setTimeout(async () => {
			await showChat.classList.remove('hidden');
		}, 820);
		chatServices.classList.remove('expand');
		setTimeout(async () => {
			await chatModal.classList.remove('show');
		}, 500);
	};

	const keyPressHandler = (e) => {
		if (e.key === 'Enter') {
			if (!e.target.value) {
				toast.error('Please ask one ask to chatbot !!');
			}
			userSendMessage(e.target.value);
			e.target.value = '';
		}
	};

	const userSendMessage = async (text) => {
		//  user send message
		let conversation = {
			who: 'User',
			content: {
				text: {
					text: text,
				},
			},
		};

		dispatch(saveMessage(conversation));

		try {
			//I will send request to the textQuery ROUTE
			const config = {
				headers: { 'Content-Type': 'application/json' },
			};
			const { data } = await axios.post(
				'/api/chatbot/sendMessageToChatBot',
				{
					text,
				},
				config
			);
			conversation = { who: 'ChatBot', content: data.chatBotResponse };

			dispatch(saveMessage(conversation));
			// for (let content of response.data.fulfillmentMessages) {
			// 	conversation = {
			// 		who: 'bot',
			// 		content: content,
			// 	};

			// 	// dispatch(saveMessage(conversation));
			// }
		} catch (error) {
			conversation = {
				who: 'ChatBot',
				content: {
					text: {
						text: 'Error just occured, please check problems !!',
					},
				},
			};
			dispatch(saveMessage(conversation));
		}
	};

	const userSendFrequentlyAskEvent = async (event) => {
		try {
			const config = {
				headers: { 'Content-Type': 'application/json' },
			};

			const { data } = await axios.post(
				'/api/chatbot/sendFrequentlyAskToChatBot',
				{
					event,
				},
				config
			);

			let conversation = {
				who: 'ChatBot',
				content: data.chatBotResponseFrequentlyAskEvent,
			};
			dispatch(saveMessage(conversation));

			// for (let content of data.fulfillmentMessages) {
			// 	let conversation = {
			// 		who: 'bot',
			// 		content: content,
			// 	};

			// 	// dispatch(saveMessage(conversation));
			// }
		} catch (error) {
			let conversation = {
				who: 'ChatBot',
				content: {
					text: {
						text: ' Error just occured, please check the problem',
					},
				},
			};
			dispatch(saveMessage(conversation));
		}
	};

	const renderOneMessage = (message, i) => {
		console.log('message', message.content);

		return (
			<>
				{message?.who === 'ChatBot' &&
					message?.who === 'User' &&
					message?.content &&
					message?.content.text &&
					message?.content.text.text && (
						<>
							{/* <div className="chat bg-slate-200 text-gray-700 p-2 self-start my-2 rounded-md shadow mr-3">
								{message?.content}
							</div> */}
							{/* {message?.who === 'ChatBot' ? (
								<div className="chat bg-slate-200 text-gray-700 p-2 self-start my-2 rounded-md shadow mr-3">
									{message?.content}
								</div>
							) : (
								<div className="message bg-green-500 text-sky-500 border-cyan-500 border-1 p-2 self-end my-2 rounded-md shadow ml-3">
									{message?.content?.text?.text}
								</div>
							)} */}
						</>
					)}
			</>
		);
	};

	const renderMessage = (returnedMessages) => {
		if (returnedMessages) {
			return returnedMessages.map((message, i) => {
				return renderOneMessage(message, i);
			});
		} else {
			return null;
		}
	};

	return (
		<>
			<div className="fixed bottom-0 right-0 flex flex-col items-end ml-6 w-full chatbot">
				<div className="chat-modal show bg-white mr-5 flex flex-col mb-5 shadow-lg sm:w-1/2 md:w-1/3 lg:w-1/4">
					<div
						className="close-chat bg-red-500 hover:bg-red-600 text-white mb-1 w-10 flex justify-center items-center px-2 py-1 rounded self-end cursor-pointer"
						onClick={closeChatBot}
					>
						<svg
							width="1em"
							height="1em"
							viewBox="0 0 16 16"
							className="bi bi-x"
							fill="currentColor"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								fill-rule="evenodd"
								d="M11.854 4.146a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708-.708l7-7a.5.5 0 0 1 .708 0z"
							/>
							<path
								fill-rule="evenodd"
								d="M4.146 4.146a.5.5 0 0 0 0 .708l7 7a.5.5 0 0 0 .708-.708l-7-7a.5.5 0 0 0-.708 0z"
							/>
						</svg>
					</div>

					<div className="flex justify-between items-center text-white p-2 bg-sky-500 border shadow-lg mr-5 w-full">
						<div className="flex items-center">
							<img
								src="https://f0.pngfuel.com/png/136/22/profile-icon-illustration-user-profile-computer-icons-girl-customer-avatar-png-clip-art-thumbnail.png"
								alt="picture"
								className="rounded-full w-8 h-8 mr-1"
							/>
							<h2 className="font-semibold tracking-wider">ChatBot</h2>
						</div>
						<div className="flex items-center justify-center">
							<small className="mr-1">online</small>
							<div className="rounded-full w-2 h-2 bg-white"></div>
						</div>
					</div>
					<div className="flex flex-col bg-white px-2 chat-services expand overflow-auto">
						{/* {renderMessage(messages)} */}
						<>
							{messages ? (
								messages?.map((item) => (
									<>
										{item.who === 'ChatBot' ? (
											<div className="chat bg-slate-200 text-gray-700 p-2 self-start my-2 rounded-md shadow mr-3">
												{item.content}
												{console.log(item)}
											</div>
										) : (
											<div className="message bg-green-500 text-sky-500 border-cyan-500 border-1 p-2 self-end my-2 rounded-md shadow ml-3">
												{item?.content?.text?.text}
											</div>
										)}
									</>
								))
							) : (
								<h1>ss</h1>
							)}
						</>
					</div>
					{/* <div className="flex flex-col bg-white px-2 chat-services expand overflow-auto">
						<div className="chat bg-slate-200 text-gray-700 p-2 self-start my-2 rounded-md shadow mr-3">
							apa ada yang bisa saya bantu ?
						</div>
						<div style={{ height: 644, width: '100%', overflow: 'auto' }}>
							{renderMessage(messages)}
						</div>
						<div className="message bg-green-500 text-sky-500 border-cyan-500 border-1 p-2 self-end my-2 rounded-md shadow ml-3">
							Lorem ipsum dolor sit amet consectetur adipisicing elit.
							Perferendis, quod.
						</div>
					</div> */}

					<div className="relative bg-white">
						<input
							type="text"
							name="message"
							placeholder="Send a ask..."
							className="pl-4 pr-16 py-2 border border-green-500 focus:outline-none w-full"
							onKeyPress={keyPressHandler}
						/>
						<button className="absolute right-0 bottom-0 text-green-600 bg-white  hover:text-green-500 m-1 px-3 py-1 w-auto transistion-color duration-100 focus:outline-none">
							Send
						</button>
					</div>
				</div>
				<div
					className="show-chat hidden mx-10 mb-6 mt-4 text-green-500 hover:text-green-600 flex justify-center items-center cursor-pointer bg-red-600l"
					onClick={showChatBot}
				>
					<MarkUnreadChatAltIcon color="info" sx={{ fontSize: 55 }} />
				</div>
			</div>
		</>
	);
};

export default ChatBot;
