const User = require('../models/User');
const catchAsyncError = require('../utils/catchAsyncError');
const AppError = require('../utils/AppError');

// Searches all users whose usernames start with textQuery value. 'i' stands for case insensitive
exports.searchPeople = catchAsyncError(async (req, res, next) => {
   const textQuery = req.query.username;
   const matchingUsers = await User.find({
      username: { $regex: `${textQuery}`, $options: 'i' }
   });

   // matchingUsers.forEach(user => {
   //    user.mutualFriends = user.friends.reduce((accum, friendId) => {
   //       console.log(accum);
   //       return accum + +req.user.friends.includes(friendId);
   //    }, 0);
   // });
   return res.status(200).json({
      status: 'success',
      results: matchingUsers.length,
      users: matchingUsers
   });
});

exports.addUserAsFriend = catchAsyncError(async (req, res, next) => {
   const userToAdd = await User.findById(req.params.userId);
   console.log('userToAdd:', userToAdd);

   if (!userToAdd) return next(new AppError('User to add not found', 404));

   if (req.user.friends.includes(userToAdd._id))
      return next(
         new AppError(`You cannot add an already exisiting friend.`, 400)
      );

   if (userToAdd._id + '' === req.user._id + '')
      return next(
         new AppError(`You cannot add yourself. Add someone else.`, 400)
      );

   req.user.friends.push(userToAdd._id);
   await req.user.save();

   return res.status(200).json({
      status: 'success',
      user: userToAdd
   });
   next();
});

exports.deleteFriend = catchAsyncError(async (req, res, next) => {
   const friend = await User.findById(req.params.id);

   if (!friend) next(new AppError('User to delete not found', 404));
   req.user.friends = req.user.friends.filter(
      f => `${f._id}` !== req.params.id
   );
   await req.user.save();

   res.json({
      user: await User.findById(req.user._id)
   });
   next();
});
