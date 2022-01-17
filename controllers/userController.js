const User = require('../models/userModel');
const sendEmail = require('../utils/sendMail');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const QRCode = require('qrcode');
const { google } = require('googleapis');
const { OAuth2 } = google.auth;
const fetch = require('node-fetch');
const client = new OAuth2(process.env.MAILING_SERVICE_CLIENT_ID);
const { CLIENT_URL } = process.env;

// Register User
exports.register = async (req, res) => {
	try {
		const { name, email, password, avatar } = req.body;

		if (!name || !email || !password) {
			return res.status(400).json({ message: 'Please enter all fields !!' });
		}

		if (!validateEmail(email)) {
			return res.status(400).json({ message: 'Invalid emails !!' });
		}
		const user = await User.findOne({ email });
		if (user) {
			return res.status(400).json({ msg: 'This email already exists !!' });
		}

		const newUser = {
			name,
			email,
			password,
			avatar,
		};
		const activationToken = createActivationToken(newUser);

		const url = `${CLIENT_URL}/api/activate/${activationToken}`;
		sendEmail(email, url, 'Please click to verify your email address');

		res.status(200).json({
			message: 'Please check your email to register account !!.',
		});
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

// Active email to register User
exports.activateEmailRegister = async (req, res) => {
	try {
		const { activationToken } = req.body;
		const user = jwt.verify(
			activationToken,
			process.env.ACTIVATION_TOKEN_SECRET
		);

		const { name, email, password, avatar } = user;

		const checkEmail = await User.findOne({ email });
		if (checkEmail) {
			return res.status(400).json({ message: 'This email already exists.' });
		}

		const newUser = new User({
			name,
			email,
			password,
			avatar,
		});

		await newUser.save();

		res.json({ message: 'Account has been activated successful !!' });
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
};

// Login user
exports.login = async (req, res) => {
	try {
		const { email, password } = req.body;

		if (!email || !password) {
			return res
				.status(403)
				.json({ message: 'Please Enter Email & Password !!' });
		}

		const user = await User.findOne({ email }).select('+password');

		if (!user) {
			return res.status(400).json({ message: 'Invalid email or password !!' });
		}

		const isPasswordMatched = await user.comparePassword(password);

		if (!isPasswordMatched) {
			return res.status(400).json({ message: 'Password is incorrect.' });
		}

		const refreshToken = createRefreshToken({ id: user._id });
		res.cookie('refreshToken', refreshToken, {
			httpOnly: true,
			path: '/api/refreshToken',
			expiresIn: 7 * 24 * 60 * 60 * 1000,
		});

		let stringData = JSON.stringify(user);

		// Print the QR code to terminal use !!
		// QRCode.toString(stringData, { type: 'terminal' }, function (err, QRcode) {
		// 	if (err) return console.log('Error occurred !!');

		// 	// Printing the generated code
		// 	console.log(QRcode);
		// });

		// // Converting the data into base64
		// QRCode.toDataURL(
		// 	stringdata,
		// 	{
		// 		color: {
		// 			dark: '#00F',
		// 			light: '#0000',
		// 		},
		// 		width: 100,
		// 	},
		// 	function (err, code) {
		// 		if (err) return console.log('error occurred');

		// 		// Printing the code
		// 		console.log(code);
		// 	}
		// );

		res.status(200).json({ message: 'Login success !!' });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Login with google
exports.googleLogin = async (req, res) => {
	try {
		const { tokenId } = req.body;

		const dataVerify = await client.verifyIdToken({
			idToken: tokenId,
			audience: process.env.MAILING_SERVICE_CLIENT_ID,
		});

		const { email_verified, email, name, picture } = dataVerify.payload;
		const password = email + process.env.GOOGLE_SECRET;
		const hashPassword = await bcrypt.hash(password, 12);

		if (!email_verified) {
			return res.status(400).json({ message: 'This email is not exist !!' });
		}

		const user = await User.findOne({ email });
		if (user) {
			const matchPassword = await bcrypt.compare(password, user.password);
			if (!matchPassword) {
				return res
					.status(400)
					.json({ message: 'Wrong or invalid password !!' });
			}

			const refreshToken = createRefreshToken({ id: user._id });
			res.cookie('refreshToken', refreshToken, {
				httpOnly: true,
				path: '/api/refreshToken',
				expiresIn: 7 * 24 * 60 * 60 * 1000,
			});

			res.status(200).json({ message: 'Login success !!' });
		} else {
			const newUser = new User({
				name,
				email,
				password: hashPassword,
				avatar: picture,
			});

			await newUser.save();

			const refreshToken = createRefreshToken({ id: newUser._id });
			res.cookie('refreshToken', refreshToken, {
				httpOnly: true,
				path: '/api/refreshToken',
				expiresIn: 7 * 24 * 60 * 60 * 1000,
			});

			res.status(200).json({ message: 'Login success !!' });
		}

		res.status(200).json({ message: 'Login success !!' });
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
};

// Login with facebook
exports.facebookLogin = async (req, res) => {
	try {
		const { accessToken, userID } = req.body;

		const URL = `https://graph.facebook.com/v4.0/${userID}/?fields=id,name,email,picture&access_token=${accessToken}`;

		const data = await fetch(URL)
			.then((res) => res.json())
			.then((res) => {
				return res;
			});

		const { email, name, picture } = data;

		const password = email + process.env.FACEBOOK_SECRET;

		const passwordHash = await bcrypt.hash(password, 12);

		const user = await User.findOne({ email });

		if (user) {
			const isMatch = await bcrypt.compare(password, user.password);
			if (!isMatch)
				return res.status(400).json({ msg: 'Password is incorrect.' });

			const refresh_token = createRefreshToken({ id: user._id });
			res.cookie('refreshtoken', refresh_token, {
				httpOnly: true,
				path: '/user/refresh_token',
				maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
			});

			res.json({ msg: 'Login success!' });
		} else {
			const newUser = new User({
				name,
				email,
				password: passwordHash,
				avatar: picture.data.url,
			});

			await newUser.save();

			const refresh_token = createRefreshToken({ id: newUser._id });
			res.cookie('refreshtoken', refresh_token, {
				httpOnly: true,
				path: '/user/refresh_token',
				maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
			});

			res.json({ msg: 'Login success!' });
		}
	} catch (err) {
		return res.status(500).json({ msg: err.message });
	}
};

// create access token
exports.getAccessToken = (req, res) => {
	try {
		const refreshToken = req.cookies.refreshToken;
		if (!refreshToken) {
			return res.status(400).json({ message: 'Please login again !!' });
		}

		jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
			if (err) {
				return res.status(400).json({ message: 'Please login again !!' });
			}

			const accessToken = createAccessToken({ id: user.id });
			res.json({ accessToken });
		});
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
};

// Forgot password user
exports.forgotPassword = async (req, res) => {
	try {
		const { email } = req.body;
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(404).json({ message: 'User not found !!' });
		}
		const accessToken = createAccessToken({ id: user.id });

		const resetPasswordUrl = `${CLIENT_URL}/api/resetPassword/${accessToken}`;
		sendEmail(
			email,
			resetPasswordUrl,
			'Please click to reset your password !!'
		);
		res
			.status(200)
			.json({ message: 'Please check your email to reset your password !!' });
	} catch (error) {
		return res.status(500).json({ message: err.message });
	}
};

// Reset Password User
exports.resetPassword = async (req, res) => {
	try {
		const { password } = req.body;
		const passwordHash = await bcrypt.hash(password, 12);
		await User.findOneAndUpdate(
			{ _id: req.user.id },
			{
				password: passwordHash,
			}
		);

		res.status(200).json({ message: 'Password changed success !!' });
	} catch (error) {
		return res.status(500).json({ message: err.message });
	}
};

// Logout User
exports.logout = async (req, res) => {
	try {
		res.clearCookie('refreshToken', { path: '/api/refreshToken' });
		res.status(200).json({ message: 'Logout success !!' });
	} catch (error) {
		return res.status(500).json({ message: err.message });
	}
};

// Get all user -- Admin
exports.getAllUser = async (req, res) => {
	try {
		const users = await User.find();

		res.status(200).json(users);
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
};

// Get detail user (load user exists)
exports.getDetailUser = async (req, res) => {
	try {
		const user = await User.findById(req.user.id).select('-password');

		res.status(200).json(user);
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
};

// UserSelf update
exports.updateUserSelf = async (req, res) => {
	try {
		const { name, avatar } = req.body;
		await User.findOneAndUpdate(
			{ _id: req.user.id },
			{
				name,
				avatar,
			}
		);

		res.json({ message: 'Update UserSelf success !!' });
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
};

// Update role for user -- Admin
exports.updateUserRole = async (req, res) => {
	try {
		const { role } = req.body;
		await User.findOneAndUpdate({ _id: req.params.id }, { role });
		res.json({ message: 'Update role success !!' });
	} catch (error) {
		return res.status(500).json({ message: err.message });
	}
};

// Delete user -- Admin
exports.deleteUser = async (req, res) => {
	try {
		const user = await User.findOne({ _id: req.params.id });
		if (!user) {
			return res.status(404).json({ message: 'User not found !!' });
		}
		await User.deleteOne({ _id: req.params.id });
		return res.status(200).json({ message: 'Delete user successful !!' });
	} catch (error) {
		return res.status(500).json({ message: err.message });
	}
};

const validateEmail = (email) => {
	const getValid =
		/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return getValid.test(email);
};

const createActivationToken = (payload) => {
	return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET, {
		expiresIn: '10m',
	});
};

const createAccessToken = (payload) => {
	return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
		expiresIn: '30m',
	});
};

const createRefreshToken = (payload) => {
	return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
		expiresIn: '14d',
	});
};
