const express = require('express');
const router = express.Router();
const {
	createAccStaff,
	deleteAccStaff,
} = require('../controllers/adminController');
const { isAuthenticatedUser, authorWithRole } = require('../middleware/auth');

router
	.route('/createAccStaff')
	.post(isAuthenticatedUser, authorWithRole('Admin'), createAccStaff);

router
	.route('/deleteAccStaff/:id')
	.delete(isAuthenticatedUser, authorWithRole('Admin'), deleteAccStaff);

module.exports = router;
