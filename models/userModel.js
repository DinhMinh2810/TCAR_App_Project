const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, 'Please enter your name !!'],
			minLength: [4, 'Name should have more than 4 characters !!'],
			trim: true,
		},
		email: {
			type: String,
			required: [true, 'Please enter your Email !!'],
			unique: true,
			trim: true,
		},
		password: {
			type: String,
			required: [true, 'Please enter your Password !!'],
			minLength: [6, 'Password should be greater than 6 characters !!'],
			select: false,
		},
		avatar: {
			id: {
				type: String,
				required: true,
			},
			url: {
				type: String,
				required: true,
			},
		},
		role: {
			type: String,
			enum: ['admin', 'employee', 'driver', 'user'],
			default: 'user',
		},
	},
	{ timeStamp: true }
);

// Create JWT access TOKEN
userSchema.methods.createAccessToken = function () {
	return jwt.sign({ id: this._id }, process.env.ACCESS_TOKEN_SECRET, {
		expiresIn: '30m',
	});
};

// Hash password
userSchema.pre('save', async function () {
	if (!this.isModified('password')) {
		next();
	}
	this.password = await bcrypt.hash(this.password, 12);
});

// Compare Password
userSchema.methods.comparePassword = async function (password) {
	return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
