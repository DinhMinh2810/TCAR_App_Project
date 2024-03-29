const express = require('express');
const router = express.Router();
const {
	getAllCars,
	getAdAllCars,
	getDetailCar,
	createCar,
	updateCar,
	deleteCar,
	assignCarToDriver,
	createCarReview,
	getCarReviews,
	deleteReview,
	removeAssignCar,
	getDriverAssignCar,
} = require('../controllers/carController');
const { isAuthenticatedUser, authorWithRole } = require('../middleware/auth');

router.route('/getAllCars').get(getAllCars);

router
	.route('/myAssignCar')
	.get(isAuthenticatedUser, authorWithRole('Driver'), getDriverAssignCar);

router
	.route('/assign')
	.post(isAuthenticatedUser, authorWithRole('Staff'), assignCarToDriver);

router
	.route('/removeAssign/:id')
	.delete(isAuthenticatedUser, authorWithRole('Staff'), removeAssignCar);

router
	.route('/getAdAllCars')
	.get(isAuthenticatedUser, authorWithRole('Admin', 'Staff'), getAdAllCars);

router.route('/getDetailCar/:id').get(getDetailCar);

router
	.route('/create')
	.post(isAuthenticatedUser, authorWithRole('Admin'), createCar);

router
	.route('/update/:id')
	.put(isAuthenticatedUser, authorWithRole('Admin'), updateCar);

router
	.route('/delete/:id')
	.delete(isAuthenticatedUser, authorWithRole('Admin'), deleteCar);

router.route('/reviewCreate').put(isAuthenticatedUser, createCarReview);

router
	.route('/review')
	.get(isAuthenticatedUser, authorWithRole('Staff'), getCarReviews);

router
	.route('/review/delete')
	.delete(isAuthenticatedUser, authorWithRole('Staff'), deleteReview);

module.exports = router;
