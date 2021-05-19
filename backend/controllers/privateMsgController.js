const User = require('../models/User');
const PrivateMsg = require('../models/PrivateMsg');
const catchAsyncError = require('../utils/catchAsyncError');
const AppError = require('../utils/AppError');

const handleWrongRole = (req, sender, next) => {
   if (req.user._id.toString() == sender.toString()) return 'true';
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

exports.getMsgsWithFriend = catchAsyncError(async (req, res, next) => {
   const friend = await User.findById(req.params.id);
   console.log(req.user);
   if (!friend)
      return next(new AppError('Friend does not exist as a user', 404));
   if (!req.user.friends.includes(`${friend._id}`))
      return next(new AppError('User is not your friend', 404));

   const msgs = await PrivateMsg.find({
      $or: [
         { sender: req.user._id, receiver: friend._id },
         { sender: friend._id, receiver: req.user._id }
      ]
   });
   // .limit(2)
   // .sort('-createdAt');
   res.status(200).json({ status: 'success', msgs });
});

exports.editMsg = catchAsyncError(async (req, res, next) => {
   const msg = await PrivateMsg.findById(req.params.id);
   if (!msg) return next(new AppError('Message does not exist', 404));

   if (handleWrongRole(req, msg.sender, next) === 'true') {
      await PrivateMsg.updateOne({ _id: msg._id }, req.body);
      return res.json('Edited');
   }
});

exports.deleteMsg = catchAsyncError(async (req, res, next) => {
   const msg = await PrivateMsg.findById(req.params.id);
   if (!msg) return next(new AppError('Message does not exist', 404));

   if (handleWrongRole(req, msg.sender, next) === 'true') {
      await PrivateMsg.findByIdAndDelete(req.params.id);
      return res.json('Deleted');
   }
});
