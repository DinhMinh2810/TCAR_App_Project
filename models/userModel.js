const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

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
		resetPasswordToken: String,
		resetPasswordExpireIn: Date,
	},
	{ timeStamp: true }
);

// Hash password
userSchema.pre('save', async function (next) {
	if (!this.isModified('password')) {
		next();
	}
	this.password = await bcrypt.hash(this.password, 12);
});

// Create JWT access TOKEN
userSchema.methods.createAccessToken = function () {
	return jwt.sign({ id: this._id }, process.env.ACCESS_TOKEN_SECRET, {
		expiresIn: '30m',
	});
};

// Compare Password
userSchema.methods.comparePassword = async function (password) {
	return await bcrypt.compare(password, this.password);
};

// Generating Password Reset Token
userSchema.methods.getResetPasswordToken = function () {
	// Generating Token
	const resetToken = crypto.randomBytes(20).toString('hex');

	// Hashing and adding resetPasswordToken to userSchema
	this.resetPasswordToken = crypto
		.createHash('sha256')
		.update(resetToken)
		.digest('hex');

	this.resetPasswordExpireIn = 7 * 24 * 60 * 60 * 1000;

	return resetToken;
};

module.exports = mongoose.model('User', userSchema);
