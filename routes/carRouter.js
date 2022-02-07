const express = require('express');
const router = express.Router();
const { createProduct } = require('../controllers/carController');
const { isAuthenticatedUser, authorWithRole } = require('../middleware/auth');

router
	.route('/cars/create')
	.post(isAuthenticatedUser, authorWithRole('Admin'), createProduct);
module.exports = router;
