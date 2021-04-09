const mongoose = require('mongoose');

const PrivateMsgSchema = new mongoose.Schema({
   text: { type: String, required: true },
   sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
   },
   receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
   },
   createdAt: { type: Date, default: Date.now }
});

module.exports = PrivateMsg = mongoose.model('PrivateMsg', PrivateMsgSchema);
