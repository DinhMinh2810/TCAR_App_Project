const User = require('../models/userModel');
const Car = require('../models/carModel');
// const bcrypt = require('bcrypt');
const catchAsyncErrShort = require('../middleware/catchAsyncErrShort');

// Create account driver -- Staff
exports.createAccDriver = async (req, res) => {
	try {
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
		});
		res
			.status(200)
			.json({ message: 'Staff create account for Driver success !!.' }, user);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

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
	return res.status(200).json({ message: 'Delete user successful !!' });
});

// Get all account driver
exports.getAccDriver = catchAsyncErrShort(async (req, res) => {
	const resultItemPage = 5;
	const usersCount = await User.countDocuments();
	const apiFeature = new ApiFeatures(User.find({ role: 'Driver' }), req.query)
		.filter()
		.pagination(resultItemPage);

	const users = await apiFeature.query;

	res.status(200).json({ usersCount, resultItemPage, users });
});

// Get all account driver
exports.getDriverNotAssign = catchAsyncErrShort(async (req, res) => {
	const users = await User.find({ role: 'Driver', isAssign: false });
	return res.status(200).json(users);
});

const validateEmail = (email) => {
	const getValid =
		/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return getValid.test(email);
};
