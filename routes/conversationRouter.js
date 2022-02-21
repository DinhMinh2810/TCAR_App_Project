const express = require('express');
const router = express.Router();

const {
	createConversation,
	getConversationUser,
	createMessage,
	getMessageUser,
} = require('../controllers/conversationController');
const { isAuthenticatedUser } = require('../middleware/auth');

router
	.route('/createConversation')
	.post(isAuthenticatedUser, createConversation);

router.route('/:userId').get(isAuthenticatedUser, getConversationUser);

router.route('/createMessage').post(isAuthenticatedUser, createMessage);

router
	.route('/message/:conversationId')
	.get(isAuthenticatedUser, getMessageUser);

module.exports = router;
