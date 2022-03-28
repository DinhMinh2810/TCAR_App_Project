const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const cloudinary = require('cloudinary');
const catchAsyncErrShort = require('../middleware/catchAsyncErrShort');
const ApiFeatures = require('../utils/ApiFeatures');

// Get all user
exports.getAllAccount = catchAsyncErrShort(async (req, res) => {
	const resultItemPage = 5;
	const usersCount = await User.countDocuments();
	const apiFeature = new ApiFeatures(User.find(), req.query)
		.filter()
		.pagination(resultItemPage);

	const users = await apiFeature.query;

	res.status(200).json({ usersCount, resultItemPage, users });
});

// Update role for user
exports.updateUserRole = async (req, res) => {
	try {
		const { role } = req.body;
		if (!role) {
			return res.status(400).json({ message: 'Please enter new role !!' });
		}

		await User.findOneAndUpdate(
			{ _id: req.params.id },
			{ role },
			{
				new: true,
				runValidators: true,
				useFindAndModify: false,
			}
		);

		res.status(200).json({ message: 'Update role success !!' });
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

// Delete Account User --Admin
exports.deleteAccUser = catchAsyncErrShort(async (req, res, next) => {
	const user = await User.findById(req.params.id);

	if (!user) {
		return res.status(400).json({ message: 'User not found !!' });
	}

	const imageId = user.avatar.public_id;

	await cloudinary.v2.uploader.destroy(imageId);

	await user.remove();

	res.status(200).json({
		success: true,
		message: 'Deleted account user successfully !!',
	});
});

// Get all account staff
exports.getAccStaff = catchAsyncErrShort(async (req, res) => {
	const resultItemPage = 5;
	const usersCount = await User.countDocuments();
	const apiFeature = new ApiFeatures(User.find({ role: 'Staff' }), req.query)
		.filter()
		.pagination(resultItemPage);

	const users = await apiFeature.query;

	res.status(200).json({ usersCount, resultItemPage, users });
});

// Create account staff
exports.createAccStaff = catchAsyncErrShort(async (req, res) => {
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
		role: 'Staff',
		avatar: {
			public_id: uploadImage.public_id,
			url: uploadImage.secure_url,
		},
	});
	res.status(200).json({
		user,
		message: 'Admin create account for Staff success !!.',
		success: true,
	});
});

// Update account staff
exports.changePWAccStaff = catchAsyncErrShort(async (req, res) => {
	const { password } = req.body;
	if (!password) {
		return res.status(400).json({ message: 'Please enter new password !!' });
	}
	const hashPassword = await bcrypt.hash(password, 12);
	await User.findOneAndUpdate(
		{ _id: req.params.id },
		{ password: hashPassword }
	);
	res.json({ message: 'Change password account staff success !!' });
});

// Delete account staff
exports.deleteAccStaff = catchAsyncErrShort(async (req, res) => {
	const user = await User.findOne({ _id: req.params.id, role: 'Staff' });
	if (!user) {
		return res.status(404).json({
			message: `User not found or just can delete user with role "Staff" !!`,
		});
	}
	const imageId = user.avatar.public_id;

	await cloudinary.v2.uploader.destroy(imageId);

	await User.deleteOne({ _id: req.params.id });
	return res.status(200).json({ message: 'Delete user successful !!' });
});

const validateEmail = (email) => {
	const getValid =
		/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return getValid.test(email);
};
