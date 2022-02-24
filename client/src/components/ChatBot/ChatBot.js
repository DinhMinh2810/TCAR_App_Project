import React, { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { saveMessage } from '../../redux/actions/chatbotAction';

const ChatBot = () => {
	const dispatch = useDispatch();
	const textQuery = async (text) => {
		//  First  Need to  take care of the message I sent
		let conversation = {
			who: 'user',
			content: {
				text: {
					text: text,
				},
			},
		};

		console.log('text i send' + conversation);

		// We need to take care of the message Chatbot sent
		const textQueryVariables = {
			text,
		};
		try {
			//I will send request to the textQuery ROUTE
			const response = await axios.post(
				'/api/dialogflow/textQuery',
				textQueryVariables
			);
			dispatch(saveMessage(conversation));
			// for (let content of response.data.fulfillmentMessages) {
			// 	conversation = {
			// 		who: 'bot',
			// 		content: content,
			// 	};
			// }
		} catch (error) {
			conversation = {
				who: 'bot',
				content: {
					text: {
						text: ' Error just occured, please check the problem',
					},
				},
			};
			dispatch(saveMessage(conversation));
		}
	};

	useEffect(() => {
		eventQuery('Welcometomywebsies');
	}, []);

	const eventQuery = async (event) => {
		// We need to take care of the message Chatbot sent
		const eventQueryVariables = {
			event,
		};
		try {
			//I will send request to the textQuery ROUTE
			const response = await axios.post(
				'/api/dialogflow/eventQuery',
				eventQueryVariables
			);
			const content = response.data.fulfillmentMessages[0];
			let conversation = {
				who: 'bot',
				content: content,
			};

			console.log('====================================');
			console.log(conversation);
			console.log('====================================');
		} catch (error) {
			let conversation = {
				who: 'bot',
				content: {
					text: {
						text: ' Error just occured, please check the problem',
					},
				},
			};
		}
	};

	const keyPressHanlder = (e) => {
		if (e.key === 'Enter') {
			if (!e.target.value) {
				return alert('you need to type somthing first');
			}
			//we will send request to text query route
			textQuery(e.target.value);

			e.target.value = '';
		}
	};

	return (
		<div
			style={{
				height: 700,
				width: 700,
				border: '3px solid black',
				borderRadius: '7px',
			}}
		>
			<div style={{ height: 644, width: '100%', overflow: 'auto' }}></div>
			<input
				style={{
					margin: 0,
					width: '100%',
					height: 50,
					borderRadius: '4px',
					padding: '5px',
					fontSize: '1rem',
				}}
				placeholder="Send a message..."
				onKeyPress={keyPressHanlder}
				type="text"
			/>
		</div>
	);
};

export default ChatBot;
