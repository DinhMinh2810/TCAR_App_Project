const mongoose = require('mongoose');

const carSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, 'Please Enter car Name !!'],
			trim: true,
		},
		description: {
			type: String,
			required: [true, 'Please Enter car Description !!'],
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
		rentPerDay: {
			type: Number,
			required: true,
		},
		available: {
			type: String,
			required: true,
			enum: ['isBooked', 'notYetBook'],
			default: 'notYetBook',
		},
		numOfReviews: {
			type: Number,
			default: 0,
		},
		assigns: {
			user: {
				type: mongoose.Schema.ObjectId,
				ref: 'User',
			},
			name: {
				type: String,
			},
			role: {
				type: String,
			},
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
				avatar: {
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
				createdAt: {
					type: Date,
					default: Date.now,
				},
			},
		],
		userCreateId: {
			type: mongoose.Schema.ObjectId,
			ref: 'User',
			required: true,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Car', carSchema);
