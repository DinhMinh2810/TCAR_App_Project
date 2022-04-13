const User = require('../models/userModel');
const Chat = require('../models/chatModel');
const catchAsyncErrShort = require('../middleware/catchAsyncErrShort');
const Message = require('../models/messageModel');

// Get all user chat
exports.sendMessage = catchAsyncErrShort(async (req, res) => {
	const { content, chatId } = req.body;
	if (!content || !chatId) {
		return res.status(400).json({ message: 'Content or chatId not right !!' });
	}
	let message = await Message.create({
		sender: req.user._id,
		content: content,
		chat: chatId,
	});
	message = await message.populate('sender', 'name avatar');
	message = await message.populate('chat');
	message = await User.populate(message, {
		path: 'chat.users',
		select: 'name avatar email',
	});
	await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message });
	res.status(200).json(message);
});

// Get all user chat
exports.allMessages = catchAsyncErrShort(async (req, res) => {
	const messages = await Message.find({ chat: req.params.chatId })
		.populate('sender', 'name avatar email')
		.populate('chat');

	res.status(200).json(messages);
});
