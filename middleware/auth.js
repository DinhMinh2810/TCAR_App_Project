const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

exports.isAuthenticatedUser = async (req, res, next) => {
	try {
		const { token } = req.cookies;
		if (token === 'j:null') {
			return res
				.status(401)
				.json({ message: ' Invalid Authentication !! Please login again' });
		}

		const decodedData = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

		req.user = await User.findById(decodedData.id);

		next();
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
};

exports.authorWithRole = (...roles) => {
	try {
		return async (req, res, next) => {
			const user = await User.findOne({ _id: req.user.id });
			if (!roles.includes(user.role)) {
				return res.status(403).json({
					message: `${user.role} role is not allowed to access this data !!`,
				});
			}
			next();
		};
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};
