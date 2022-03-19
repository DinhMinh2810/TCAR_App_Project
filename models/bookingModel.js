const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
	{
		receivingCarTo: {
			citizenIdentifications: {
				type: Number,
				required: true,
			},
			phoneNum: {
				type: Number,
				required: true,
			},
			day: {
				type: String,
				required: true,
			},
			address: {
				type: String,
				required: true,
			},
			location: {
				type: String,
				required: true,
			},
		},
		bookCars: [
			{
				name: {
					type: String,
					required: true,
				},
				rentPerDay: {
					type: Number,
					required: true,
				},
				quantity: {
					type: Number,
					required: true,
				},
				image: {
					type: String,
					required: true,
				},
				startDay: {
					type: String,
					required: true,
				},
				endDay: {
					type: String,
					required: true,
				},
				car: {
					type: mongoose.Schema.ObjectId,
					ref: 'Car',
					required: true,
				},
			},
		],
		userBooking: {
			type: mongoose.Schema.ObjectId,
			ref: 'User',
			required: true,
		},

		paymentInfo: {
			id: {
				type: String,
				required: true,
			},
			status: {
				type: String,
				required: true,
			},
		},
		paidAt: {
			type: Date,
			required: true,
		},
		itemsPrice: {
			type: Number,
			required: true,
			default: 0,
		},
		shuttleFee: {
			type: Number,
			required: true,
			default: 0,
		},
		priceForDriver: {
			type: Number,
			required: true,
			default: 0,
		},
		deposits: {
			type: Number,
			required: true,
			default: 0,
		},
		totalPrice: {
			type: Number,
			required: true,
			default: 0,
		},
		bookingStatus: {
			type: String,
			required: true,
			default: 'Processing',
		},
		deliveredAt: Date,
	},
	{ timeStamps: true }
);

module.exports = mongoose.model('Booking', bookingSchema);
