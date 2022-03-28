const express = require('express');
const router = express.Router();
const {
	createAccDriver,
	getAccDriver,
	getDriverNotAssign,
	changePWAccDriver,
	deleteAccDriver,
} = require('../controllers/staffController');

const { isAuthenticatedUser, authorWithRole } = require('../middleware/auth');

router
	.route('/createAccDriver')
	.post(isAuthenticatedUser, authorWithRole('Staff'), createAccDriver);

router
	.route('/changePWAccDriver/:id')
	.put(isAuthenticatedUser, authorWithRole('Staff'), changePWAccDriver);

router
	.route('/deleteAccDriver/:id')
	.delete(isAuthenticatedUser, authorWithRole('Staff'), deleteAccDriver);

router
	.route('/getAccountDriver')
	.get(isAuthenticatedUser, authorWithRole('Staff'), getAccDriver);

router
	.route('/getDriverNotAssign')
	.get(isAuthenticatedUser, authorWithRole('Staff'), getDriverNotAssign);

module.exports = router;
