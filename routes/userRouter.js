const express = require('express');
const router = express.Router();
const {
	register,
	activateEmailRegister,
	login,
	googleLogin,
	facebookLogin,
	forgotPassword,
	OtpResetPassword,
	resetPassword,
	userDetailExist,
	logout,
	editUserProfile,
	changePassword,
	getSingleUserDetail,
} = require('../controllers/userController');
const { isAuthenticatedUser, authorWithRole } = require('../middleware/auth');

router.route('/register').post(register);

router.route('/activateEmail').post(activateEmailRegister);

router.route('/login').post(login);

router.route('/googleLogin').post(googleLogin);

router.route('/facebookLogin').post(facebookLogin);

router.route('/forgotPassword').post(forgotPassword);

router.route('/OtpResetPassword').post(OtpResetPassword);

router.route('/resetPassword/:token').put(resetPassword);

router.route('/logout').get(logout);

router.route('/userDetailExist').get(isAuthenticatedUser, userDetailExist);

router.route('/changePassword').put(isAuthenticatedUser, changePassword);

router.route('/editUserProfile/me').put(isAuthenticatedUser, editUserProfile);

router
	.route('/singleUserDetail/:id')
	.get(
		isAuthenticatedUser,
		authorWithRole('Admin', 'Staff', 'Driver'),
		getSingleUserDetail
	);

module.exports = router;
