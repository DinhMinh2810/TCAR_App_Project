const express = require('express');
const router = express.Router();
const { createAccDriver } = require('../controllers/staffController');

const { isAuthenticatedUser, authorWithRole } = require('../middleware/auth');

router
	.route('/createAccDriver')
	.post(isAuthenticatedUser, authorWithRole('Staff'), createAccDriver);

module.exports = router;
