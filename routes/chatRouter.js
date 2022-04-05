const express = require('express');
const router = express.Router();
const {
	allUsersChat,
	accessChat,
	allChatsOfUser,
	createGroupChat,
	addUserToGroup,
	removeUserFromGroup,
	renameGroup,
	getChatDetail,
} = require('../controllers/chatController');
const { isAuthenticatedUser, authorWithRole } = require('../middleware/auth');

router
	.route('/getChatDetail/:id')
	.get(
		isAuthenticatedUser,
		authorWithRole('Admin', 'Staff', 'Driver'),
		getChatDetail
	);

router
	.route('/allUsersChat')
	.get(
		isAuthenticatedUser,
		authorWithRole('Admin', 'Staff', 'Driver'),
		allUsersChat
	);

router
	.route('/accessChat')
	.post(
		isAuthenticatedUser,
		authorWithRole('Admin', 'Staff', 'Driver'),
		accessChat
	);

router
	.route('/allChatsOfUser')
	.get(
		isAuthenticatedUser,
		authorWithRole('Admin', 'Staff', 'Driver'),
		allChatsOfUser
	);

router
	.route('/createGroupChat')
	.post(isAuthenticatedUser, authorWithRole('Admin', 'Staff'), createGroupChat);

router
	.route('/renameGroup')
	.put(
		isAuthenticatedUser,
		authorWithRole('Admin', 'Staff', 'Driver'),
		renameGroup
	);

router
	.route('/addUserToGroup')
	.put(
		isAuthenticatedUser,
		authorWithRole('Admin', 'Staff', 'Driver'),
		addUserToGroup
	);

router
	.route('/removeUserFromGroup')
	.put(
		isAuthenticatedUser,
		authorWithRole('Admin', 'Staff'),
		removeUserFromGroup
	);

module.exports = router;
