const Booking = require('../models/bookingModel');
const Car = require('../models/carModel');
const catchAsyncErrShort = require('../middleware/catchAsyncErrShort');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

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
		res.status(404).json({
			success: false,
			message: 'You have already choose this booking !!',
		});
	}

	if (req.body.status === 'beConfirm') {
		booking.bookCars.forEach(async (book) => {
			await updateAvailableCar(book.car, book.quantity);
			res.status(404).json({
				success: false,
				message:
					'Cannot update booking because car available <  car quantity book !!',
			});
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

async function updateAvailableCar(id, quantity) {
	const car = await Car.findById(id);

	if (car.available < quantity) {
		console.log(
			'Cannot update booking because car available <  car quantity book!!'
		);
	} else {
		car.available -= quantity;
		await car.save({ validateBeforeSave: false });
	}
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

exports.paymentStripe = catchAsyncErrShort(async (req, res) => {
	const payment = await stripe.paymentIntents.create({
		amount: req.body.amount,
		currency: 'inr',
		metadata: {
			company: 'Ecommerce',
		},
	});

	res.status(200).json({ success: true, client_secret: payment.client_secret });
});

exports.sendApiKeyStripe = catchAsyncErrShort(async (req, res) => {
	res.status(200).json({
		message: 'Send API Key successfully !!',
		stripeApiKey: process.env.STRIPE_API_KEY,
	});
});
