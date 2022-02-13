require('dotenv').config({ path: './config.env' });
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const path = require('path');
const bodyParser = require('body-parser');
// const cloudinary = require('cloudinary');

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

// Routes
const userRouter = require('./routes/userRouter');
const adminRouter = require('./routes/adminRouter');
const staffRouter = require('./routes/staffRouter');
const carRouter = require('./routes/carRouter');
const bookingRouter = require('./routes/bookingRouter');

app.use('/api', userRouter);
app.use('/api/admin', adminRouter);
app.use('/api/staff', staffRouter);
app.use('/api/cars', carRouter);
app.use('/api/booking', bookingRouter);

connectDB();

// Set up upload avatar
// cloudinary.config({
// 	cloud_name: process.env.CLOUDINARY_NAME,
// 	api_key: process.env.CLOUDINARY_API_KEY,
// 	api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// Deploy
if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));
	app.get('*', (req, res) => {
		res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
	});
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`Run sever success with ${PORT}`);
});

// phone otp
// app.get('/sendSMS', function (req, res) {
// 	const accountSid = 'AC4a446db682bef159efd5f3e549b3f103';
// 	const authToken = '8f687c07ae35eb039caf8c9cafe333ff';
// 	const client = require('twilio')(accountSid, authToken);

// 	client.messages
// 		.create({
// 			body: '123minh',
// 			from: '+18126136090',
// 			to: '+84905092786',
// 		})
// 		.then((message) => console.log('ok'))
// 		.catch((err) => console.log(err));
// });

