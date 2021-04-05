const jwt = require('jsonwebtoken');
const User = require('../models/User');
const AppError = require('../utils/AppError');
const catchAsyncError = require('../utils/catchAsyncError');

const createToken = function (id) {
   const token = jwt.sign({ id }, process.env.JWT_PRIVATE_KEY, {
      expiresIn: process.env.JWT_PRIVATE_KEY_EXPIRES_IN
   });
   return token;
};

exports.signup = catchAsyncError(async function (req, res, next) {
   const { username, email, password } = req.body;
   const newUser = await User.create({ username, email, password });
   return res.status(201).json({
      status: 'success',
      data: { user: newUser, token: createToken(newUser._id) }
   });
});

exports.login = catchAsyncError(async function (req, res, next) {
   const { username, password } = req.body;
   if (!username || !password)
      return next(new AppError('Wrong email or password entered', 401));
   const user = await User.findOne({ username }).select('+password');

   if (!user || !(await user.checkPasswordMatch(user.password, password)))
      return next(new AppError('Wrong email or password entered', 401));

   return res.status(200).json({
      status: 'success',
      token: createToken(user._id)
   });
});

exports.guard = catchAsyncError(async function (req, res, next) {
   let token;
   if (
      req.headers['auth-token'] &&
      req.headers['auth-token'].startsWith('Bearer')
   )
      token = req.headers['auth-token'].split(' ')[1];

   if (!token)
      return next(new AppError('Authentication failed. Login to get access'));

   res.status(200).json({ status: 'success' });
});
