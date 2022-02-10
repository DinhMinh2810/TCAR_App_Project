const Booking = require('../models/bookingModel');
const catchAsyncErrShort = require('../middleware/catchAsyncErrShort');

// get Single booking -- Admin
exports.getSingleBooking = catchAsyncErrShort(async (req, res) => {
	const booking = await Booking.findById(req.params.id).populate(
		'userBooking',
		'name email role'
	);

	if (!booking) {
		res.status(404).json({
			message: 'Booking not found !!',
			booking,
		});
	}

	res.status(200).json({
		success: true,
		booking,
	});
});

// get all Booking -- Admin
exports.getAllBooking = catchAsyncErrShort(async (req, res) => {
	const booking = await Booking.find();

	let totalAllPrice = 0;

	booking.forEach((book) => {
		totalAllPrice += book.totalPrice;
	});

	res.status(200).json({
		success: true,
		totalAllPrice,
		booking,
	});
});

// Logged in and user check my booking
exports.myBooking = catchAsyncErrShort(async (req, res) => {
	const booking = await Booking.find({ user: req.user._id });

	res.status(200).json({
		success: true,
		booking,
	});
});

// Create new booking car
exports.newBooking = catchAsyncErrShort(async (req, res) => {
	const {
		deliverCarInfo,
		bookCars,
		bookedTimeSlots,
		paymentInfo,
		itemsPrice,
		totalPrice,
	} = req.body;

	const booking = await Booking.create({
		deliverCarInfo,
		bookCars,
		bookedTimeSlots,
		paymentInfo,
		itemsPrice,
		totalPrice,
		paidAt: Date.now(),
		userBooking: req.user._id,
	});

	res.status(201).json({
		message: 'Booking created successfully !!',
		booking,
	});
});

// Update booking status -- Admin
exports.updateBookingStatus = catchAsyncErrShort(async (req, res) => {
	const booking = await Booking.findById(req.params.id);

	if (!booking) {
		res.status(404).json({
			success: false,
			message: 'Booking not found !!',
		});
	}

	if (booking.bookingStatus === 'Done') {
		res.status(400).json({
			success: false,
			message: 'This book has set and done !!',
		});
	}

	if (req.body.status === 'Shipped') {
		booking.bookCars.forEach(async (o) => {
			await updateStock(o.car._id, o.quantity);
		});
	}

	booking.bookingStatus = req.body.status;

	if (req.body.status === 'Done') {
		booking.deliveredAt = Date.now();
	}

	await booking.save({ validateBeforeSave: false });
	res.status(200).json({
		message: 'Update this booking successfully !!',
		booking,
	});
});

async function updateStock(id, quantity) {
	const booking = await Booking.findById(id);
	console.log('====================================');
	console.log(booking.rentPerDay);
	console.log('====================================');

	// booking.available -= quantity;

	await booking.save({ validateBeforeSave: false });
}

// delete booking
exports.deleteBooking = catchAsyncErrShort(async (req, res) => {
	const booking = await Booking.findById(req.params.id);

	if (!booking) {
		res.status(404).json({
			success: true,
			message: 'Booking not found because this id not exists !!',
		});
	}

	await booking.remove();

	res.status(200).json({
		success: true,
		message: 'Delete booking successfully !!',
	});
});
