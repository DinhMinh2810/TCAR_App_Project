const Car = require('../models/carModel');
const catchAsyncErrShort = require('../middleware/catchAsyncErrShort');

// Get all Car -- Admin
exports.getAllCars = catchAsyncErrShort(async (req, res, next) => {
	const cars = await Car.find();
	res.status(200).json({
		success: true,
		cars,
	});
});

// Create car -- Admin
exports.createCar = catchAsyncErrShort(async (req, res) => {
	req.body.userId = req.user.id;
	const car = await Car.create(req.body);
	res.status(201).json({ success: true, car });
});

// Update car -- Admin
exports.updateCar = catchAsyncErrShort(async (req, res) => {
	let car = await Car.findById(req.params.id);
	if (!car) {
		return res.status(404).json('Car not found !!');
	}

	car = await Car.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true,
		useFindAndModify: false,
	});
	res.status(200).json({ success: true, car });
});

// Delete car -- Admin
exports.deleteCar = catchAsyncErrShort(async (req, res) => {
	const car = await Car.findById(req.params.id);

	if (!car) {
		res.status(500).json({ message: 'Car not found !!' });
	}
	await car.remove();
	res.status(200).json({ success: true, message: 'Car deleted success !!' });
});
