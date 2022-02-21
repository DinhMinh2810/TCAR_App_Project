const express = require('express');
const router = express.Router();

const {
	createConversation,
	getConversationUser,
	createMessage,
	getMessageUser,
} = require('../controllers/conversationController');
const { isAuthenticatedUser, authorWithRole } = require('../middleware/auth');

router.route('/createConversation').post(createConversation);

router.route('/:userId').get(getConversationUser);

router.route('/createMessage').post(createMessage);

router.route('/message/:conversationId').get(getMessageUser);

module.exports = router;
