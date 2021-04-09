const User = require('../models/User');
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
