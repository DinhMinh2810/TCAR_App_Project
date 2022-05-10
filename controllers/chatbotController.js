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
	//Need to send some information that comes from the client to Dialogflow API
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

// User send message frequently asked questions to chatbot
exports.sendFrequentlyAskToChatBot = catchAsyncErrShort(async (req, res) => {
	//Need to send some information that comes from the client to Dialogflow API
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

	const responses = await sessionClient.detectIntent(request);
	const result = responses[0].queryResult;

	res.status(200).json({
		userSendMessageFrequentlyAsk: result.queryText,
		chatBotResponseFrequentlyAskEvent: result.fulfillmentText,
	});
});
