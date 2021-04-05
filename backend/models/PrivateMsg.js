const mongoose = require('mongoose');

const PrivateMsgSchema = new mongoose.Schema({
   text: { type: String },
   sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
   receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
   createdAt: { type: Date, default: Date.now }
});
module.exports = PrivateMsg = mongoose.model('PrivateMsg', PrivateMsgSchema);
