const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, 'Please enter your name !!'],
			maxLength: [20, 'Name cannot exceed 20 characters'],
			minLength: [4, 'Name should have more than 4 characters'],
			trim: true,
		},
		email: {
			type: String,
			required: [true, 'Please enter your Email'],
			unique: true,
			trim: true,
		},
		password: {
			type: String,
			required: [true, 'Please enter your Password'],
			minLength: [6, 'Password should be greater than 6 characters'],
			select: false,
		},
		avatar: {
			type: String,
			default:
				'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqh30_JHQRPWX4VFRnz_LQKvZMU6kt9VaWMwF6VioJh8DMGyWCfT--Bf2UsPGS0OaH91k&usqp=CAU',
		},
		role: {
			type: String,
			enum: ['admin', 'employee', 'driver', 'user'],
			default: 'user',
		},
	},
	{ timeStamp: true }
);

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
