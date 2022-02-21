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
		available: {
			type: Number,
			required: true,
			maxLength: [3],
			default: 1,
		},
		numOfReviews: {
			type: Number,
			default: 0,
		},
		assigns: [
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
				role: {
					type: String,
					required: true,
				},
			},
		],
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
				driver: {
					type: String,
					required: true,
				},
				comment: {
					type: String,
					required: true,
				},
			},
		],
		userCreateId: {
			type: mongoose.Schema.ObjectId,
			ref: 'User',
			required: true,
		},
	},
	{ timeStamps: true }
);

module.exports = mongoose.model('Car', carSchema);
