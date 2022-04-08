const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
	{
		sender: { type: mongoose.Schema.ObjectId, ref: 'User' },
		content: { type: String, trim: true },
		chat: { type: mongoose.Schema.ObjectId, ref: 'Chat' },
		readBy: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Message', messageSchema);
