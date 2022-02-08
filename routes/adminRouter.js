const express = require('express');
const router = express.Router();
const {
	getAllAccount,
	updateUserRole,
	createAccStaff,
	getAccStaff,
	changePWAccStaff,
	deleteAccStaff,
} = require('../controllers/adminController');
const { isAuthenticatedUser, authorWithRole } = require('../middleware/auth');

router
	.route('/getAllAccount')
	.get(isAuthenticatedUser, authorWithRole('Admin'), getAllAccount);

router
	.route('/updateUserRole/:id')
	.put(isAuthenticatedUser, authorWithRole('Admin'), updateUserRole);

router
	.route('/createAccStaff')
	.post(isAuthenticatedUser, authorWithRole('Admin'), createAccStaff);

router
	.route('/getAccountStaff')
	.get(isAuthenticatedUser, authorWithRole('Admin'), getAccStaff);

router
	.route('/changePWAccStaff/:id')
	.put(isAuthenticatedUser, authorWithRole('Admin'), changePWAccStaff);

router
	.route('/deleteAccStaff/:id')
	.delete(isAuthenticatedUser, authorWithRole('Admin'), deleteAccStaff);

module.exports = router;
