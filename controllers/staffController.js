const User = require('../models/userModel');
const cloudinary = require('cloudinary');
const bcrypt = require('bcrypt');
const ApiFeatures = require('../utils/ApiFeatures');
const catchAsyncErrShort = require('../middleware/catchAsyncErrShort');

// Create account driver - Staff
exports.createAccDriver = catchAsyncErrShort(async (req, res) => {
	const uploadImage = await cloudinary.v2.uploader.upload(req.body.avatar, {
		folder: 'avatars',
		width: 150,
		crop: 'scale',
	});
	const { name, email, password } = req.body;

	if (!name || !email || !password) {
		return res.status(400).json({ message: 'Please enter all fields !!' });
	}

	if (!validateEmail(email)) {
		return res.status(400).json({ message: 'Invalid emails !!' });
	}
	const checkUser = await User.findOne({ email });
	if (checkUser) {
		return res.status(400).json({ message: 'This email already exists !!' });
	}
	const user = await User.create({
		name,
		email,
		password,
		role: 'Driver',
		avatar: {
			public_id: uploadImage.public_id,
			url: uploadImage.secure_url,
		},
	});
	res.status(200).json({
		user,
		message: 'Staff create account for Driver success !!',
		success: true,
	});
});

// Update account staff
exports.changePWAccDriver = catchAsyncErrShort(async (req, res) => {
	const { password } = req.body;
	if (!password) {
		return res.status(400).json({ message: 'Please enter new password !!' });
	}
	const hashPassword = await bcrypt.hash(password, 12);
	await User.findOneAndUpdate(
		{ _id: req.params.id },
		{ password: hashPassword }
	);
	res.json({ message: 'Change password account driver success !!' });
});

// Delete account staff
exports.deleteAccDriver = catchAsyncErrShort(async (req, res) => {
	const user = await User.findOne({ _id: req.params.id, role: 'Driver' });
	if (!user) {
		return res.status(404).json({
			message: `User not found or just can delete user with role "Driver" !!`,
		});
	}
	const imageId = user.avatar.public_id;

	await cloudinary.v2.uploader.destroy(imageId);

	await User.deleteOne({ _id: req.params.id });
	return res
		.status(200)
		.json({ success: true, message: 'Delete user successful !!' });
});

// Get all account driver
exports.getAccDriver = catchAsyncErrShort(async (req, res) => {
	const resultItemPage = 5;
	const usersCount = await User.countDocuments({ role: 'Driver' });
	const apiFeature = new ApiFeatures(User.find({ role: 'Driver' }), req.query)
		.filter()
		.pagination(resultItemPage);

	const users = await apiFeature.query;

	res.status(200).json({ usersCount, resultItemPage, users });
});

// Get all account driver
exports.getDriverNotAssign = catchAsyncErrShort(async (req, res) => {
	const resultItemPage = 5;
	const usersCount = await User.countDocuments({
		role: 'Driver',
		isAssign: false,
	});

	const apiFeature = new ApiFeatures(
		User.find({ role: 'Driver', isAssign: false }),
		req.query
	).pagination(resultItemPage);

	const users = await apiFeature.query;

	res.status(200).json({ usersCount, resultItemPage, users });
});

const validateEmail = (email) => {
	const getValid =
		/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return getValid.test(email);
};
