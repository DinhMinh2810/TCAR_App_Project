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
// exports.assignCar = catchAsyncErrShort(async (req, res) => {
// 	let car = await Car.findById(req.params.id);
// 	let users = await User.find({ role: 'Staff' });

// 	if (!car) {
// 		res.status(500).json({ message: 'Car not found !!' });
// 	}
// 	car = await Car.findByIdAndUpdate(req.params.id, req.body);
// 	console.log('====================================');
// 	console.log(users.name);
// 	console.log('====================================');

// 	res.status(200).json({ success: true, car });
// });

// Create and update review for car
exports.createCarReview = catchAsyncErrShort(async (req, res) => {
	const { rating, comment, driver, carId } = req.body;

	const review = {
		user: req.user._id,
		name: req.user.name,
		rating: Number(rating),
		driver,
		comment,
	};

	const car = await Car.findById(carId);
	const isReviewed = car.reviews.find(
		(rev) => rev.user.toString() === req.user._id.toString()
	);

	if (isReviewed) {
		car.reviews.forEach((rev) => {
			if (rev.user.toString() === req.user._id.toString())
				(rev.rating = rating), (rev.driver = driver), (rev.comment = comment);
		});
	} else {
		car.reviews.push(review);
		car.numOfReviews = car.reviews.length;
	}

	let avg = 0;

	car.reviews.forEach((rev) => {
		avg += rev.rating;
	});

	car.ratings = avg / car.reviews.length;

	await car.save({ validateBeforeSave: false });

	res.status(200).json({
		success: true,
		message: 'Create or update review success !!',
	});
});

// Get All Reviews of car
exports.getCarReviews = catchAsyncErrShort(async (req, res) => {
	const car = await Car.findById(req.query.id);

	if (!car) {
		return res.status(404).json({
			success: true,
			message: 'Car not found !!',
		});
	}

	res.status(200).json({
		success: true,
		reviews: car.reviews,
	});
});

// Delete Review
exports.deleteReview = catchAsyncErrShort(async (req, res) => {
	const car = await Car.findById(req.query.carId);

	if (!car) {
		return res.status(404).json({
			success: true,
			message: 'Car not found !!',
		});
	}

	const reviews = car.reviews.filter(
		(rev) => rev._id.toString() !== req.query.id.toString()
	);

	let avg = 0;

	reviews.forEach((rev) => {
		avg += rev.rating;
	});

	let ratings = 0;

	if (reviews.length === 0) {
		ratings = 0;
	} else {
		ratings = avg / reviews.length;
	}

	const numOfReviews = reviews.length;

	await Car.findByIdAndUpdate(
		req.query.carId,
		{
			reviews,
			ratings,
			numOfReviews,
		},
		{
			new: true,
			runValidators: true,
			useFindAndModify: false,
		}
	);

	res.status(200).json({
		success: true,
		message: 'Delete reviews successfully !!',
	});
});
