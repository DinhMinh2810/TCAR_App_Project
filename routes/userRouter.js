const express = require('express');
const router = express.Router();
const {
	register,
	activateEmailRegister,
	login,
	googleLogin,
	facebookLogin,
	getAccessToken,
	forgotPassword,
	resetPassword,
	userDetailExist,
	logout,
	updateUserSelf,
} = require('../controllers/userController');
const { isAuthenticatedUser } = require('../middleware/auth');

router.route('/register').post(register);

router.route('/activateEmail').post(activateEmailRegister);

router.route('/login').post(login);

router.route('/googleLogin').post(googleLogin);

router.route('/facebookLogin').post(facebookLogin);

router.route('/forgotPassword').post(forgotPassword);

router.route('/resetPassword/:token').put(resetPassword);

router.route('/logout').get(logout);

router.route('/userDetailExist').get(isAuthenticatedUser, userDetailExist);

router.route('/updateUserSelf').put(isAuthenticatedUser, updateUserSelf);

module.exports = router;
