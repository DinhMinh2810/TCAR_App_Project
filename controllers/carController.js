const Car = require('../models/carModel');
const catchAsyncErrShort = require('../middleware/catchAsyncErrShort');
const User = require('../models/userModel');
const ApiFeatures = require('../utils/ApiFeatures');

// Get all Car -- Admin
exports.getAdAllCars = catchAsyncErrShort(async (req, res) => {
	const cars = await Car.find();
	res.status(200).json({
		success: true,
		cars,
	});
});

// Get all Car with search, pagination -- All
exports.getAllCars = catchAsyncErrShort(async (req, res) => {
	const resultPerPage = 5;
	const apiFeature = new ApiFeatures(Car.find(), req.query)
		.search()
		.filter()
		.pagination(resultPerPage);
	const cars = await apiFeature.query;
	res.status(200).json({ success: true, cars });
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
	const car = await Car.findByIdAndDelete(req.params.id);
	if (!car) {
		res.status(500).json({ message: 'Car not found !!' });
	}

	res.status(200).json({ success: true, message: 'Car deleted success !!' });
});

// assign car -- Admin chua lam
exports.assignCar = catchAsyncErrShort(async (req, res) => {
	let car = await Car.findById(req.params.id);
	let users = await User.find({ role: 'Staff' });

	if (!car) {
		res.status(500).json({ message: 'Car not found !!' });
	}
	car = await Car.findByIdAndUpdate(req.params.id, req.body);
	console.log('====================================');
	console.log(users.name);
	console.log('====================================');

	res.status(200).json({ success: true, car });
});
