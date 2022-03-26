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
	generateTokenPayPal,
	paymentPayPal,
} = require('../controllers/bookingController');
const { isAuthenticatedUser, authorWithRole } = require('../middleware/auth');

router.route('/bookingDetail/:id').get(isAuthenticatedUser, getSingleBooking);

router.route('/myBooking').get(isAuthenticatedUser, myBooking);

router
	.route('/getAllBooking')
	.get(isAuthenticatedUser, authorWithRole('Admin', 'Staff'), getAllBooking);

router.route('/create').post(isAuthenticatedUser, newBooking);

router
	.route('/delete/:id')
	.delete(isAuthenticatedUser, authorWithRole('Staff'), deleteBooking);

router.route('/sendApiKeyStripe').get(isAuthenticatedUser, sendApiKeyStripe);

router.route('/paymentStripe').post(isAuthenticatedUser, paymentStripe);

router
	.route('/generateTokenPayPal')
	.get(isAuthenticatedUser, generateTokenPayPal);

router.route('/paymentPayPal').post(isAuthenticatedUser, paymentPayPal);

module.exports = router;
