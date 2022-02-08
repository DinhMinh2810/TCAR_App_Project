const express = require('express');
const router = express.Router();
const {
	getAllCars,
	createCar,
	updateCar,
	deleteCar,
} = require('../controllers/carController');
const { isAuthenticatedUser, authorWithRole } = require('../middleware/auth');

router
	.route('/getAllCars')
	.get(isAuthenticatedUser, authorWithRole('Admin'), getAllCars);

router
	.route('/create')
	.post(isAuthenticatedUser, authorWithRole('Admin'), createCar);

router
	.route('/update/:id')
	.put(isAuthenticatedUser, authorWithRole('Admin'), updateCar);

router
	.route('/delete/:id')
	.delete(isAuthenticatedUser, authorWithRole('Admin'), deleteCar);

module.exports = router;
