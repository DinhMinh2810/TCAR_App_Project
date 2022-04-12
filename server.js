require('dotenv').config({ path: './config.env' });
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const path = require('path');
const bodyParser = require('body-parser');
const cloudinary = require('cloudinary');
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
const chatRouter = require('./routes/chatRouter');
const messageRouter = require('./routes/messageRouter');
const chatbotRouter = require('./routes/chatbotRouter');

app.use('/api', userRouter);
app.use('/api/admin', adminRouter);
app.use('/api/staff', staffRouter);
app.use('/api/cars', carRouter);
app.use('/api/booking', bookingRouter);
app.use('/api/chat', chatRouter);
app.use('/api/message', messageRouter);
app.use('/api/chatbot', chatbotRouter);

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

const server = app.listen(PORT, () => {
	console.log(`Run sever success with ${PORT}`);
});

// Socket real time chat
const io = require('socket.io')(server, {
	pingTimeout: 60000,
	cors: {
		origin: 'http://localhost:3000',
	},
});

io.on('connection', (socket) => {
	console.log('Server connected to socket.io with client success !!');
	socket.on('setup', (userData) => {
		socket.join(userData._id);
		socket.emit('connected !!');
	});

	socket.on('join chat', (room) => {
		socket.join(room);
		console.log('User is login, joined room: ' + room);
	});

	socket.on('new message', (newMessageReceived) => {
		let chat = newMessageReceived.chat;

		if (!chat.users) {
			return console.log('Chat of user not defined !!');
		}

		chat.users.forEach((user) => {
			if (user._id == newMessageReceived.sender._id) return;

			socket.in(user._id).emit('message received', newMessageReceived);
		});
	});

	socket.off('setup', () => {
		console.log('User disconnected !!');
		socket.leave(userData._id);
	});
});
