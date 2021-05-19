const User = require('../models/User');
const PrivateMsg = require('../models/PrivateMsg');
const AppError = require('../utils/AppError');
const catchAsyncError = require('../utils/catchAsyncError');
const mongoose = require('mongoose');

exports.getUserPublicProfile = async (req, res, next) => {
   const user = await User.findById(req.params.id);
   if (!user) next(new AppError('User not found', 404));

   const mutualFriends = req.user.friends.filter(fId =>
      user.friends.includes(fId)
   );
   return res.status(200).json({ status: 'success', user, mutualFriends });
};

exports.updateMe = catchAsyncError(async (req, res, next) => {
   const user = await User.findByIdAndUpdate(req.user._id, req.body, {
      new: true,
      useFindAndModify: false,
      runValidators: true
   });
   if (!user) next(new AppError('User not found', 404));

   return res.status(200).json({ user });
});
