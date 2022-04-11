const mongoose = require('mongoose');

const connectDB = async () => {
	try {
		const connection = await mongoose.connect(process.env.MONGO_URL_CLOUD, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});

		console.log(
			`MongoDB connected success with ${connection.connection.host} server`
		);
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
};

module.exports = connectDB;
