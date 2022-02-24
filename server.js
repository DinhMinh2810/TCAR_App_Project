require('dotenv').config({ path: './config.env' });
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const path = require('path');
const bodyParser = require('body-parser');
const cloudinary = require('cloudinary');
const socket = require('./socketIO');
const app = express();

app.use(express.json({ limit: '50mb' }));
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(fileUpload());

// Routes
const userRouter = require('./routes/userRouter');
const adminRouter = require('./routes/adminRouter');
const staffRouter = require('./routes/staffRouter');
const carRouter = require('./routes/carRouter');
const bookingRouter = require('./routes/bookingRouter');
const conversationRouter = require('./routes/conversationRouter');
const dialogflowRouter = require('./routes/dialogflowRouter');

app.use('/api', userRouter);
app.use('/api/admin', adminRouter);
app.use('/api/staff', staffRouter);
app.use('/api/cars', carRouter);
app.use('/api/booking', bookingRouter);
app.use('/api/conversation', conversationRouter);
app.use('/api/dialogflow', dialogflowRouter);

connectDB();

// Set up upload avatar
cloudinary.config({
	cloud_name: process.env.CLOUDINARY_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

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
