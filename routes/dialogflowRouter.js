const express = require('express');
const router = express.Router();

const dialogflow = require('@google-cloud/dialogflow');
// Your credentials
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

router.post('/textQuery', async (req, res) => {
	//We need to send some information that comes from the client to Dialogflow API
	let sessionPath = sessionClient.projectAgentSessionPath(PROJECID, sessionId);
	// The text query request.
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
	console.log('Detected intent');
	const result = responses[0].queryResult;
	console.log(`  Query: ${result.queryText}`);
	console.log(`  Response: ${result.fulfillmentText}`);

	res.send(result);
});

//Event Query Route -- create 1 cau noi de bot tra loi

router.post('/eventQuery', async (req, res) => {
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
module.exports = router;
