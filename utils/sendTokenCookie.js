// Create token and save in cookie

const sendTokenCookie = (user, responseStatusCode, res, text) => {
	const token = user.createAccessToken();

	// options for cookie  !!
	const optionsCookie = {
		expiresIn: 7 * 24 * 60 * 60 * 1000,
		httpOnly: true,
	};

	res.status(responseStatusCode).cookie('token', token, optionsCookie).json({
		message: text,
		user,
		token,
	});
};

module.exports = sendTokenCookie;
