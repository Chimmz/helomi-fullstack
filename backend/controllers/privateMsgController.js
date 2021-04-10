const User = require('../models/User');
const PrivateMsg = require('../models/PrivateMsg');
const catchAsyncError = require('../utils/catchAsyncError');
const AppError = require('../utils/AppError');

const handleWrongRole = (currentUser, sender, next) => {
   if (currentUser === sender) return 'true';
   return next(new AppError("You're not authorized to delete this msg", 403));
};

exports.sendMsg = catchAsyncError(async (req, res, next) => {
   const [sender, { text, receiver: receiverId }] = [req.user._id, req.body];
   const receiver = await User.findById(receiverId);
   if (!receiver)
      return next(new AppError('Cannot send message to non-existing user'));
   const newMsg = await PrivateMsg.create({
      sender,
      text,
      receiver: receiver._id
   });
   return res.json({ newMsg });
});

exports.editMsg = catchAsyncError(async (req, res, next) => {
   const msg = await PrivateMsg.findById(req.params.id);
   if (!msg) return next(new AppError('Message does not exist', 404));
   if (handleWrongRole(`${req.user._id}`, `${msg.sender}`, next) === 'true') {
      await PrivateMsg.updateOne({ _id: msg._id }, req.body);
      return res.json('Edited');
   }
});

exports.deleteMsg = catchAsyncError(async (req, res, next) => {
   const msg = await PrivateMsg.findById(req.params.id);
   if (!msg) return next(new AppError('Message does not exist', 404));
   if (handleWrongRole(`${req.user._id}`, `${msg.sender}`, next) === 'true') {
      await PrivateMsg.findByIdAndDelete(req.params.id);
      return res.json('Deleted');
   }
});
