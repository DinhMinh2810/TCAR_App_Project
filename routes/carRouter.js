const express = require('express');
const router = express.Router();
const {
	getAllCars,
	getAdAllCars,
	createCar,
	updateCar,
	deleteCar,
	createCarReview,
	getCarReviews,
	deleteReview,
} = require('../controllers/carController');
const { isAuthenticatedUser, authorWithRole } = require('../middleware/auth');

router.route('/getAllCars').get(getAllCars);

router
	.route('/getAdAllCars')
	.get(isAuthenticatedUser, authorWithRole('Admin'), getAdAllCars);

router
	.route('/create')
	.post(isAuthenticatedUser, authorWithRole('Admin'), createCar);

router
	.route('/update/:id')
	.put(isAuthenticatedUser, authorWithRole('Admin'), updateCar);

router
	.route('/delete/:id')
	.delete(isAuthenticatedUser, authorWithRole('Admin'), deleteCar);

router.route('/reviewCreate').post(isAuthenticatedUser, createCarReview);

router.route('/review').post(isAuthenticatedUser, getCarReviews);

router.route('/review/delete').delete(isAuthenticatedUser, deleteReview);
module.exports = router;
