const express = require('express');
const router = express.Router();
const {
	newBooking,
	getSingleBooking,
	myBooking,
	getAllBooking,
	deleteBooking,
	updateBookingStatus,
	paymentStripe,
	sendApiKeyStripe,
} = require('../controllers/bookingController');
const { isAuthenticatedUser, authorWithRole } = require('../middleware/auth');

router
	.route('/bookingUser/:id')
	.get(isAuthenticatedUser, authorWithRole('Admin'), getSingleBooking);

router.route('/myBooking').get(isAuthenticatedUser, myBooking);

router
	.route('/getAllBooking')
	.get(isAuthenticatedUser, authorWithRole('Admin'), getAllBooking);

router.route('/create').post(isAuthenticatedUser, newBooking);

router
	.route('/updateBookingStatus/:id')
	.put(isAuthenticatedUser, updateBookingStatus);

router.route('/delete/:id').delete(isAuthenticatedUser, deleteBooking);

router.route('/paymentStripe').post(isAuthenticatedUser, paymentStripe);

router.route('/sendApiKeyStripe').get(isAuthenticatedUser, sendApiKeyStripe);

module.exports = router;
