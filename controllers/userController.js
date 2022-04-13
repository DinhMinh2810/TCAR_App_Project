const User = require('../models/userModel');
const sendEmail = require('../utils/sendMail');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const sendTokenCookie = require('../utils/sendTokenCookie');
const { google } = require('googleapis');
const { OAuth2 } = google.auth;
const fetch = require('node-fetch');
const client = new OAuth2(process.env.MAILING_SERVICE_CLIENT_ID);
const { CLIENT_URL } = process.env;
const crypto = require('crypto');
const cloudinary = require('cloudinary');

// Register User
exports.register = async (req, res) => {
	try {
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
		const user = await User.findOne({ email });
		if (user) {
			return res.status(400).json({ message: 'This email already exists !!' });
		}

		const newUser = {
			name,
			email,
			password,
			avatar: {
				public_id: uploadImage.public_id,
				url: uploadImage.secure_url,
			},
		};

		const activationToken = createActivationToken(newUser);

		// const url = `${CLIENT_URL}/api/activate/${activationToken}`;
		const url = `${req.protocol}://${req.get(
			'host'
		)}/api/activate/${activationToken}`;
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
			return res.status(400).json({ message: 'This email already exists !!' });
		}

		const newUser = new User({
			name,
			email,
			password,
			avatar,
		});

		await newUser.save();

		sendTokenCookie(
			newUser,
			201,
			res,
			'Account has been activated successful !!'
		);
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
			return res.status(400).json({ message: 'Password is incorrect !!' });
		}

		sendTokenCookie(user, 200, res, 'Login success !!');
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

		const { email_verified, email, name, picture, sub } = dataVerify.payload;
		const password = email + process.env.GOOGLE_SECRET;
		const hashPassword = await bcrypt.hash(password, 12);

		if (!email_verified) {
			return res.status(400).json({ message: 'This email is not exist !!' });
		}

		const user = await User.findOne({ email });

		if (user) {
			sendTokenCookie(user, 200, res, 'Login success with google !!');
		} else {
			await cloudinary.v2.uploader.upload(picture, {
				folder: 'avatars',
				width: 150,
				crop: 'scale',
			});
			const newUser = new User({
				name,
				email,
				password: hashPassword,
				avatar: {
					public_id: sub,
					url: picture,
				},
			});
			await newUser.save();
			sendTokenCookie(newUser, 200, res, 'Login success with google !!');
		}
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
			sendTokenCookie(user, 200, res, 'Login success with fb !!');
		} else {
			await cloudinary.v2.uploader.upload(picture.data.url, {
				folder: 'avatars',
				width: 150,
				crop: 'scale',
			});
			const newUser = new User({
				name,
				email,
				password: passwordHash,
				avatar: {
					public_id: picture.data.width,
					url: picture.data.url,
				},
			});

			await newUser.save();

			sendTokenCookie(newUser, 200, res, 'Login success with facebook !!');
		}
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
};

// Forgot password user
exports.forgotPassword = async (req, res) => {
	try {
		const { email, method, phoneNumber } = req.body;
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(404).json({ message: 'User not found !!' });
		}

		const resetPWToken = user.getResetPasswordToken();
		const OTP = user.getResetPassWordOTP();
		// `${'http://localhost:3000'}/resetPassword/${resetPWToken}`
		const resetPasswordUrl = `${req.protocol}://${req.get(
			'host'
		)}/resetPassword/${resetPWToken}`;

		await user.save({ validateBeforeSave: false });

		if (method === 'Email') {
			try {
				await sendEmail(
					email,
					resetPasswordUrl,
					'Please click to reset your password !!'
				);

				res.status(200).json({
					message: 'Please check your email to reset your password !!',
				});
			} catch (err) {
				user.resetPasswordToken = undefined;
				user.resetPasswordExpireIn = undefined;
				await user.save({ validateBeforeSave: false });
				return res.status(500).json({ message: err.message });
			}
		} else if (method === 'Phone') {
			try {
				const accountSid = process.env.TWILIO_ACC_SID;
				const authToken = process.env.TWILIO_AUTH_TOKEN;
				const client = require('twilio')(accountSid, authToken);

				await client.messages.create({
					body: `${OTP}`,
					from: '+18126136090',
					to: phoneNumber,
					// to: '+84905092786',
				});

				res.status(200).json({
					email,
					message: 'Please check your phone to reset your password !!',
				});
			} catch (err) {
				user.resetPasswordToken = undefined;
				user.resetPasswordExpireIn = undefined;
				await user.save({ validateBeforeSave: false });
				return res.status(500).json({ message: err.message });
			}
		}
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
};

//Confirm OTP
exports.OtpResetPassword = async (req, res) => {
	try {
		// const OTP = user.resetPasswordOTP;
		const { email, confirmOTP } = req.body;
		const user = await User.findOne({ email });
		const resetPWToken = user.getResetPasswordToken();
		await user.save({ validateBeforeSave: false });

		res
			.status(200)
			.json({ message: 'Confirm OTP successfully !!', resetPWToken });
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
};

// Reset Password User
exports.resetPassword = async (req, res) => {
	try {
		const resetPasswordToken = crypto
			.createHash('sha256')
			.update(req.params.token)
			.digest('hex');

		const user = await User.findOne({
			resetPasswordToken,
			resetPasswordExpire: { $gt: Date.now() },
		});

		if (!user) {
			return res.status(404).json({ message: 'User not found !!' });
		}

		user.password = req.body.password;
		user.resetPasswordToken = undefined;
		user.resetPasswordExpire = undefined;

		await user.save();

		return res
			.status(200)
			.json({ message: 'Password changed successfully !!' });
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
};

// Logout User
exports.logout = async (req, res) => {
	try {
		res.cookie('token', null, {
			expiresIn: new Date(Date.now()),
			httpOnly: true,
		});
		res.json({ message: 'Logout success !!' });
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
};

// Get detail user (load user exists)
exports.userDetailExist = async (req, res) => {
	try {
		const user = await User.findById(req.user.id);
		res.status(200).json(user);
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
};

// Get single user detail -- Admin
exports.getSingleUserDetail = async (req, res) => {
	try {
		const user = await User.findById(req.params.id);
		if (!user) {
			return res.status(404).json({
				message: `User does not exist with this Id: ${req.params.id}`,
			});
		}

		res.status(200).json({
			success: true,
			user,
		});
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

// User edit password
exports.changePassword = async (req, res) => {
	try {
		const user = await User.findById(req.user.id).select('+password');
		if (req.body.newPassword !== req.body.confirmPassword) {
			return res.status(400).json({
				message: `Password does not match !!`,
			});
		}

		user.password = req.body.newPassword;

		await user.save();

		sendTokenCookie(user, 200, res, 'Password changed successfully !!');
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

// UserSelf update
exports.editUserProfile = async (req, res) => {
	try {
		const newDataUser = {
			name: req.body.name,
			email: req.body.email,
		};

		if (req.body.avatar !== '') {
			const user = await User.findById(req.user.id);

			const imageId = user.avatar.public_id;

			await cloudinary.v2.uploader.destroy(imageId);

			const uploadImage = await cloudinary.v2.uploader.upload(req.body.avatar, {
				folder: 'avatars',
				width: 150,
				crop: 'scale',
			});

			newDataUser.avatar = {
				public_id: uploadImage.public_id,
				url: uploadImage.secure_url,
			};
		}

		await User.findByIdAndUpdate(req.user.id, newDataUser, {
			new: true,
			runValidators: true,
			useFindAndModify: false,
		});

		res.status(200).json({
			success: true,
			message: 'User update profile success !!',
		});
	} catch (err) {
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
		expiresIn: '15m',
	});
};
