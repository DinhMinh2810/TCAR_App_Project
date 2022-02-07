const Car = require('../models/carModel');
const catchAsyncErrShort = require('../middleware/catchAsyncErrShort');

// Create Product -- Admin

exports.createProduct = async (req, res) => {
	try {
		req.body.userId = req.user.id;
		const car = await Car.create(req.body);
		res.status(201).json({ success: true, car });
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};
