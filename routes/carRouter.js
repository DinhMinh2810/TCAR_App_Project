const express = require('express');
const router = express.Router();
const {
	getAllCars,
	getAdAllCars,
	createCar,
	updateCar,
	deleteCar,
	assignCar,
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

router
	.route('/assign/:id')
	.post(isAuthenticatedUser, authorWithRole('Admin'), assignCar);

module.exports = router;
