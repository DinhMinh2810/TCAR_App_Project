const express = require('express');
const router = express.Router();
const {
	sendMessage,
	allMessages,
} = require('../controllers/messageController');
const { isAuthenticatedUser, authorWithRole } = require('../middleware/auth');

router
	.route('/sendMessage')
	.post(
		isAuthenticatedUser,
		authorWithRole('Admin', 'Staff', 'Driver'),
		sendMessage
	);

router
	.route('/allMessages/:chatId')
	.get(
		isAuthenticatedUser,
		authorWithRole('Admin', 'Staff', 'Driver'),
		allMessages
	);

module.exports = router;
