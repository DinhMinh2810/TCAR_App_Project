const User = require('../models/userModel');
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

exports.send = async (req, res) => {
	try {
		const { name, email, password } = req.body;

		res
			.status(200)
			.json({ message: 'Staff create account for Driver success !!.' }, user);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

const validateEmail = (email) => {
	const getValid =
		/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return getValid.test(email);
};
