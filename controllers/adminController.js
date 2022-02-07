const User = require('../models/userModel');
const cloudinary = require('cloudinary').v2;
const catchAsyncErrShort = require('../middleware/catchAsyncErrShort');

// CRUD account staff

// Create account staff
exports.createAccStaff = async (req, res) => {
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
			role: 'Staff',
		});

		res
			.status(200)
			.json({ user, message: 'Admin create account for Staff success !!.' });
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

// Delete account staff
exports.deleteAccStaff = catchAsyncErrShort(async (req, res) => {
	const user = await User.findOne({ _id: req.params.id, role: 'Staff' });
	if (!user) {
		return res.status(404).json({
			message: `User not found or just can delete user with role "Staff" !!`,
		});
	}
	await User.deleteOne({ _id: req.params.id });
	return res.status(200).json({ message: 'Delete user successful !!' });
});

const validateEmail = (email) => {
	const getValid =
		/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return getValid.test(email);
};
