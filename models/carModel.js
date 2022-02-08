const mongoose = require('mongoose');

const carSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, 'Please Enter car Name'],
			trim: true,
			unique: true,
		},
		description: {
			type: String,
			required: [true, 'Please Enter car Description'],
		},
		images: [
			{
				public_id: {
					type: String,
					required: true,
				},
				url: {
					type: String,
					required: true,
				},
			},
		],
		seatsCategory: {
			type: Number,
			enum: [5, 7, 16, 30],
			default: 5,
		},
		ratings: {
			type: Number,
			default: 0,
		},
		location: {
			type: String,
			required: [true],
		},
		bookedTimeSlots: [
			{
				from: { type: String, required: true },
				to: { type: String, required: true },
			},
		],
		rentPerDay: {
			type: Number,
			required: true,
			minLength: [8],
		},
		numOfReviews: {
			type: Number,
			default: 0,
		},
		reviews: [
			{
				user: {
					type: mongoose.Schema.ObjectId,
					ref: 'User',
					required: true,
				},
				name: {
					type: String,
					required: true,
				},
				rating: {
					type: Number,
					required: true,
				},
				comment: {
					type: String,
					required: true,
				},
			},
		],
		userId: {
			type: mongoose.Schema.ObjectId,
			ref: 'User',
			required: true,
		},
	},
	{ timeStamp: true }
);

module.exports = mongoose.model('Car', carSchema);
