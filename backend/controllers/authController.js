const { promisify } = require('util');
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
      return next(new AppError('Wrong username or password entered', 401));

   const user = await User.findOne({ username }).select('+password');
   if (!user || !(await user.checkPasswordMatch(user.password, password)))
      return next(new AppError('Wrong username or password entered', 401));

   return res.status(200).json({
      status: 'success',
      data: {
         user,
         token: createToken(user._id)
      }
   });
});

exports.protect = catchAsyncError(async function (req, res, next) {
   let token =
      req.headers.auth &&
      req.headers.auth.startsWith('Bearer') &&
      req.headers.auth.split(' ')[1];

   console.log(token);
   if (!token) {
      return next(
         new AppError('Authentication failed. Login to get access', 401)
      );
   }
   const decoded = await new Promise((resolve, reject) =>
      resolve(jwt.decode(token, process.env.JWT_PRIVATE_KEY))
   );
   if (!decoded || !decoded.id)
      next(new AppError('Authentication failed. Login to get access', 401));
   const user = await User.findById(decoded.id);
   console.log('REQ.USER', user);
   if (!user) return next(new AppError('User no longer exists', 401));
   req.user = user;
   next();
});

// exports.test = catchAsyncError(async function (req, res, next) {
//    return res.status(200).json({
//       status: 'You got access'
//    });
// });
