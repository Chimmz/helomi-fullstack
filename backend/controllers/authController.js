const twilio = require('twilio');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const AppError = require('../utils/AppError');
const catchAsyncError = require('../utils/catchAsyncError');
const PrivateMsg = require('../models/PrivateMsg');

const createAuthToken = function (id) {
   const token = jwt.sign({ id }, process.env.JWT_PRIVATE_KEY, {
      expiresIn: process.env.JWT_PRIVATE_KEY_EXPIRES_IN
   });
   return token;
};

const createTwilioAccessToken = function (userId) {
   console.log(userId);
   const AccessToken = require('twilio').jwt.AccessToken;
   const ChatGrant = AccessToken.ChatGrant;

   const token = new AccessToken(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_API_KEY,
      process.env.TWILIO_API_SECRET,
      { identity: userId }
   );

   const chatGrant = new ChatGrant({
      serviceSid: process.env.SYNC_SERVICE_SID
   });

   token.addGrant(chatGrant);
   token.identity = userId;
   return token.toJwt();
};

exports.signup = catchAsyncError(async function (req, res, next) {
   const { username, email, password } = req.body;

   if (await User.findOne({ email }))
      return next(new AppError('A user already exists with this email'));

   const newUser = await User.create({ username, email, password });

   return res.status(201).json({
      status: 'success',
      data: { user: newUser },
      token: createAuthToken(newUser._id),
      twilioAccessToken: createTwilioAccessToken(newUser._id)
   });
});

exports.login = catchAsyncError(async function (req, res, next) {
   const { username, password } = req.body;
   if (!username || !password)
      return next(new AppError('Wrong username or password entered', 401));

   const user = await User.findOne({ username }).select('+password').populate({
      path: 'friends',
      select: '-__v, -id'
   });

   if (!user || !(await user.checkPasswordMatch(user.password, password)))
      return next(new AppError('Wrong username or password entered', 401));

   return res.status(200).json({
      status: 'success',
      data: { user },
      token: createAuthToken(user._id),
      twilioAccessToken: createTwilioAccessToken(user._id)
   });
});

exports.protect = catchAsyncError(async function (req, res, next) {
   // console.log('In protect, req: ', req);
   let token =
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer') &&
      req.headers.authorization.split(' ')[1];

   if (!token) {
      return next(
         new AppError('Authentication failed. Login to get access', 401)
      );
   }
   const decoded = await new Promise((resolve, _) =>
      resolve(jwt.decode(token, process.env.JWT_PRIVATE_KEY))
   );
   if (!decoded || !decoded.id)
      next(new AppError('Authentication failed. Login to get access', 401));

   const user = await User.findById(decoded.id);
   if (!user) return next(new AppError('User no longer exists', 401));

   if (req.originalUrl === '/users/auth') {
      return res.status(200).json({
         status: 'success',
         user: await User.findById(user._id).select('-password').populate({
            path: 'friends',
            select: '-__v, -id'
         }),
         twilioAccessToken: createTwilioAccessToken(user._id)
      });
   }

   req.user = user;
   // console.log('Req.user:', user);
   next();
});
