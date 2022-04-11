const express = require('express');
const router = express.Router();
const {
	newBooking,
	getSingleBooking,
	myBooking,
	getAllBooking,
	deleteBooking,
	paymentStripe,
	sendApiKeyStripe,
	generateTokenBrainTree,
	paymentBrainTree,
	driverGetUserBooking,
	statisticsTotalAmountBooking,
	statisticsAmountLocationBooking,
} = require('../controllers/bookingController');
const { isAuthenticatedUser, authorWithRole } = require('../middleware/auth');

router.route('/bookingDetail/:id').get(isAuthenticatedUser, getSingleBooking);

router.route('/myBooking').get(isAuthenticatedUser, myBooking);

router
	.route('/getAllBooking')
	.get(isAuthenticatedUser, authorWithRole('Admin', 'Staff'), getAllBooking);

router
	.route('/statisticsTotalAmountBooking')
	.get(
		isAuthenticatedUser,
		authorWithRole('Admin'),
		statisticsTotalAmountBooking
	);

router
	.route('/statisticsAmountLocationBooking')
	.get(
		isAuthenticatedUser,
		authorWithRole('Admin'),
		statisticsAmountLocationBooking
	);

router.route('/create').post(isAuthenticatedUser, newBooking);

router
	.route('/delete/:id')
	.delete(isAuthenticatedUser, authorWithRole('Staff'), deleteBooking);

router
	.route('/driverGetUserBooking')
	.get(isAuthenticatedUser, authorWithRole('Driver'), driverGetUserBooking);

router.route('/sendApiKeyStripe').get(isAuthenticatedUser, sendApiKeyStripe);

router.route('/paymentStripe').post(isAuthenticatedUser, paymentStripe);

router
	.route('/generateTokenBrainTree')
	.get(isAuthenticatedUser, generateTokenBrainTree);

router.route('/paymentBrainTree').post(isAuthenticatedUser, paymentBrainTree);

module.exports = router;
