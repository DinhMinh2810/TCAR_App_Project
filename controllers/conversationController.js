const Conversation = require('../models/conversationModel');
const Message = require('../models/messageModel');
const catchAsyncErrShort = require('../middleware/catchAsyncErrShort');

// create a new Conversation
exports.createConversation = catchAsyncErrShort(async (req, res) => {
	const newConversation = new Conversation({
		members: [req.body.senderId, req.body.receiverId],
	});
	const savedConversation = await newConversation.save();
	res.status(200).json(savedConversation);
});

// get conversation of user
exports.getConversationUser = catchAsyncErrShort(async (req, res) => {
	const conversation = await Conversation.find({
		members: { $in: [req.params.userId] },
	});
	res.status(200).json(conversation);
});

// create a new message
exports.createMessage = catchAsyncErrShort(async (req, res) => {
	const newMessage = new Message(req.body);
	const saveMessage = await newMessage.save();
	res.status(200).json(saveMessage);
});

// get message of user
exports.getMessageUser = catchAsyncErrShort(async (req, res) => {
	const messages = await Message.find({
		conversationId: req.params.conversationId,
	});
	res.status(200).json(messages);
});
