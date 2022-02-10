const express = require('express');
const router = express.Router();

const { isAuthenticatedUser, authorWithRole } = require('../middleware/auth');

// router
// 	.route('/deleteAccStaff/:id')
// 	.delete(isAuthenticatedUser, authorWithRole('Admin'), deleteAccStaff);

module.exports = router;
