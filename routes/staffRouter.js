const express = require('express');
const router = express.Router();
const {
	createAccDriver,
	getAccDriver,
	getAccDriversss,
} = require('../controllers/staffController');

const { isAuthenticatedUser, authorWithRole } = require('../middleware/auth');

router
	.route('/createAccDriver')
	.post(isAuthenticatedUser, authorWithRole('Staff'), createAccDriver);

router
	.route('/getAccountDriver')
	.get(isAuthenticatedUser, authorWithRole('Staff'), getAccDriver);

router
	.route('/getAccountDriversss')
	.get(isAuthenticatedUser, authorWithRole('Staff'), getAccDriversss);

module.exports = router;
