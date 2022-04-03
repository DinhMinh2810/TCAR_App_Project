const User = require('../models/userModel');
const Chat = require('../models/chatModel');
const catchAsyncErrShort = require('../middleware/catchAsyncErrShort');

// Get all user chat
exports.allUsersChat = catchAsyncErrShort(async (req, res) => {
	const keyword = req.query.search
		? {
				$or: [
					{ name: { $regex: req.query.search, $options: 'i' } },
					{ email: { $regex: req.query.search, $options: 'i' } },
				],
		  }
		: {};

	const users = await User.find(keyword).find({
		_id: { $ne: req.user._id },
		role: { $nin: 'User' },
	});

	res.status(200).json({ users });
});

// User create or access chat
exports.accessChat = catchAsyncErrShort(async (req, res) => {
	const { userId } = req.body;

	if (!userId) {
		return res.status(400).json({ message: 'User not found !!' });
	}

	let isChat = await Chat.find({
		isGroupChat: false,
		$and: [
			{ users: { $elemMatch: { $eq: req.user._id } } },
			{ users: { $elemMatch: { $eq: userId } } },
		],
	})
		.populate('users', '-password')
		.populate('latestMessage');

	isChat = await User.populate(isChat, {
		path: 'latestMessage.sender',
		select: 'name email avatar',
	});

	if (isChat.length > 0) {
		res.json(isChat[0]);
	} else {
		const chatData = {
			chatName: 'sender',
			isGroupChat: false,
			users: [req.user._id, userId],
		};

		try {
			const createdChat = await Chat.create(chatData);
			const fullChat = await Chat.findOne({ _id: createdChat._id }).populate(
				'users',
				'-password'
			);
			res.status(200).json(fullChat);
		} catch (error) {
			return res.status(500).json({ message: error.message });
		}
	}
});

exports.allChatsOfUser = catchAsyncErrShort(async (req, res) => {
	Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
		.populate('users', '-password')
		.populate('groupCreatedBy', '-password')
		.populate('latestMessage')
		.sort({ updatedAt: -1 })
		.then(async (results) => {
			results = await User.populate(results, {
				path: 'latestMessage.sender',
				select: 'name avatar email',
			});
			res.status(200).json(results);
		});
});

exports.createGroupChat = catchAsyncErrShort(async (req, res) => {
	if (!req.body.users || !req.body.name) {
		return res.status(400).json({ message: 'Please fill all feilds !!' });
	}

	const users = JSON.parse(req.body.users);

	if (users.length < 2) {
		return res
			.status(400)
			.json('Must many than 2 users are required to form a group chat !!');
	}

	users.push(req.user);

	const groupChat = await Chat.create({
		chatName: req.body.name,
		users: users,
		isGroupChat: true,
		groupCreatedBy: req.user,
	});

	const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
		.populate('users', '-password')
		.populate('groupCreatedBy', '-password');

	res.status(200).json(fullGroupChat);
});

exports.renameGroup = catchAsyncErrShort(async (req, res) => {
	const { chatId, chatName } = req.body;

	const updatedChat = await Chat.findByIdAndUpdate(
		chatId,
		{
			chatName: chatName,
		},
		{
			new: true,
		}
	).populate('users', '-password');

	if (!updatedChat) {
		return res.status(404).json({ message: 'Chat not found !!' });
	} else {
		return res.json(updatedChat);
	}
});

exports.addUserToGroup = catchAsyncErrShort(async (req, res) => {
	const { chatId, userId } = req.body;

	const added = await Chat.findByIdAndUpdate(
		chatId,
		{
			$push: { users: userId },
		},
		{
			new: true,
		}
	).populate('users', '-password');

	if (!added) {
		return res.status(404).json({ message: 'Chat not found !!' });
	} else {
		res.json(added);
	}
});

exports.removeUserFromGroup = catchAsyncErrShort(async (req, res) => {
	const { chatId, userId } = req.body;

	const removed = await Chat.findByIdAndUpdate(
		chatId,
		{
			$pull: { users: userId },
		},
		{
			new: true,
		}
	).populate('users', '-password');

	if (!removed) {
		return res.status(404).json({ message: 'Chat not found !!' });
	} else {
		res.json(removed);
	}
});
