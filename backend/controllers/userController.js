const User = require('../models/User');
const PrivateMsg = require('../models/PrivateMsg');
const AppError = require('../utils/AppError');
const catchAsyncError = require('../utils/catchAsyncError');
const authController = require('./authController');

exports.updateMe = catchAsyncError(async (req, res, next) => {
   const user = await User.findByIdAndUpdate(req.user._id, req.body, {
      new: true,
      useFindAndModify: false,
      runValidators: true
   });
   if (!user) next(new AppError('User not found', 404));

   return res.status(200).json({ user });
});

exports.getMsgsWithFriend = catchAsyncError(async (req, res, next) => {
   const friend = await User.findById(req.params.id);
   if (!friend)
      return next(new AppError('Friend does not exist as a user', 404));
   if (!req.user.friends.find(f => f.id === `${friend._id}`))
      return next(new AppError('User is not your friend', 404));

   // const msgs = await PrivateMsg.find().and([
   //    { sender: req.user._id },
   //    { receiver: friend._id },
   //    { sender: friend._id },
   //    { receiver: req.user._id }
   // ]);
   const msgs = await PrivateMsg.find({
      $or: [
         { sender: req.user._id, receiver: friend._id },
         { sender: friend._id, receiver: req.user._id }
      ]
   });

   // );
   // .limit(2)
   // .sort('-createdAt');
   res.status(200).json({ status: 'success', msgs });
});
