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
	getAllUser,
	getDetailUser,
	logout,
	updateUserSelf,
	updateUserRole,
	deleteUser,
} = require('../controllers/userController');
const { isAuthenticatedUser, authorWithRole } = require('../middleware/auth');

router.route('/register').post(register);

router.route('/activateEmail').post(activateEmailRegister);

router.route('/login').post(login);

router.route('/googleLogin').post(googleLogin);

router.route('/facebookLogin').post(facebookLogin);

router.route('/refreshToken').post(getAccessToken);

router.route('/forgotPassword').post(forgotPassword);

router.route('/resetPassword').post(isAuthenticatedUser, resetPassword);

router.route('/logout').get(isAuthenticatedUser, logout);

router.route('/getDetailUser').get(isAuthenticatedUser, getDetailUser);

router
	.route('/getAllUser')
	.get(isAuthenticatedUser, authorWithRole('admin'), getAllUser);

router.route('/updateUserSelf').put(isAuthenticatedUser, updateUserSelf);

router
	.route('/updateUserRole/:id')
	.put(isAuthenticatedUser, authorWithRole('admin'), updateUserRole);

router
	.route('/deleteUser/:id')
	.delete(isAuthenticatedUser, authorWithRole('admin'), deleteUser);

module.exports = router;
