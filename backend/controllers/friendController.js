const User = require('../models/User');
const catchAsyncError = require('../utils/catchAsyncError');
const authController = require('./authController');

exports.addFriend = catchAsyncError(async (req, res, next) => {
   const friendToAdd = await User.findById(req.params.id).pop;
   console.log(req.user);
   // req.user.friends.push(friendToAdd);
   res.json({
      user: req.user
   });
});
