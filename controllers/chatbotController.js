const User = require('../models/userModel');
const catchAsyncErrShort = require('../middleware/catchAsyncErrShort');
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

// User send mesage normal to chatbot
exports.sendMessageToChatBot = catchAsyncErrShort(async (req, res) => {
	//We need to send some information that comes from the client to Dialogflow API
	let sessionPath = sessionClient.projectAgentSessionPath(PROJECID, sessionId);
	// The text user send to chatbot query request.
	const request = {
		session: sessionPath,
		queryInput: {
			text: {
				// The query to send to the dialogflow agent
				text: req.body.text,
				// The language used by the client (en-US)
				languageCode: languageCode,
			},
		},
	};

	const responses = await sessionClient.detectIntent(request);
	const result = responses[0].queryResult;
	res.status(200).json({
		userSendMessage: result.queryText,
		chatBotResponse: result.fulfillmentText,
	});
});

// User send mesage frequently asked questions to chatbot
exports.sendFrequentlyAskToChatBot = catchAsyncErrShort(async (req, res) => {
	//We need to send some information that comes from the client to Dialogflow API
	let sessionPath = sessionClient.projectAgentSessionPath(PROJECID, sessionId);
	// The text query request.
	const request = {
		session: sessionPath,
		queryInput: {
			event: {
				// The query to send to the dialogflow agent
				name: req.body.event,
				// The language used by the client (en-US)
				languageCode: languageCode,
			},
		},
	};

	// Send request and log result
	const responses = await sessionClient.detectIntent(request);
	console.log('Detected intent');
	const result = responses[0].queryResult;
	console.log(`  Query: ${result.queryText}`);
	console.log(`  Response: ${result.fulfillmentText}`);

	res.send(result);
});
