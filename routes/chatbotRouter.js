const express = require('express');
const router = express.Router();
const {
	sendMessageToChatBot,
	sendFrequentlyAskToChatBot,
} = require('../controllers/chatbotController');
const dialogflow = require('@google-cloud/dialogflow');
const CREDENTIALS = JSON.parse(process.env.CREDENTIALS);
const PROJECID = CREDENTIALS.project_id;
const sessionId = 'bot-session';
const languageCode = 'en-US';

// Configuration for the client
const CONFIGURATION = {
	credentials: {
		private_key: CREDENTIALS['private_key'],
		client_email: CREDENTIALS['client_email'],
	},
};

// Create a new session
const sessionClient = new dialogflow.SessionsClient(CONFIGURATION);

router.route('/sendMessageToChatBot').post(sendMessageToChatBot);

router.route('/sendFrequentlyAskToChatBot').post(sendFrequentlyAskToChatBot);

module.exports = router;
