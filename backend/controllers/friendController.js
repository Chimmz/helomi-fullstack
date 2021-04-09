const User = require('../models/User');
const catchAsyncError = require('../utils/catchAsyncError');
const AppError = require('../utils/AppError');

exports.addFriend = catchAsyncError(async (req, res, next) => {
   const friend = await User.findById(req.body.friend);
   if (!friend) next(new AppError('User to add not found', 404));
   if (req.user.friends.includes(friend._id))
      next(new AppError(`Cannot add an already exisiting friend.`, 400));
   if (`${friend._id}` === `${req.user._id}`)
      next(new AppError(`Cannot add yourself.`, 400));

   req.user.friends.push(friend._id);
   await req.user.save();

   res.json({
      user: await User.findById(req.user._id)
   });
   next();
});

exports.deleteFriend = catchAsyncError(async (req, res, next) => {
   const friend = await User.findById(req.params.id);

   if (!friend) next(new AppError('User to delete not found', 404));
   req.user.friends = req.user.friends.filter(
      f => `${f._id}` !== `${req.params.id}`
   );
   await req.user.save();

   res.json({
      user: await User.findById(req.user._id)
   });
   next();
});
