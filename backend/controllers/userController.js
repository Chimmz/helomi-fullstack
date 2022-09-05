const mongoose = require('mongoose');
const fs = require('fs');
const User = require('../models/User');
const PrivateMsg = require('../models/PrivateMsg');
const AppError = require('../utils/AppError');
const catchAsyncError = require('../utils/catchAsyncError');
const multer = require('multer');
const sharp = require('sharp');

// const multerStorage = multer.diskStorage({
//    destination: (req, file, cb) => {
//       cb(null, 'public/img/users');
//    },
//    filename: (req, file, cb) => {
//       const fileExt = file.mimetype.split('/')[1];
//       cb(null, `user-${req.user._id}-${+Date.now()}.${fileExt}`);
//    }
// });
const deleteCurrentPhoto = fileName => {
   if (fileName.includes('user-default')) return;
   fs.unlinkSync(`/uploads/users/${fileName}`).catch(err => console.log(err));
};
const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
   // deleteCurrentPhoto(req.user.photo);
   if (file.mimetype.startsWith('image')) cb(null, true);
   else cb(new AppError('Invalid file type', 400), false);
};

const upload = multer({
   storage: multerStorage,
   fileFilter: multerFilter
});

exports.uploadUserPhoto = upload.single('photo');

exports.resizeUserPhoto = (req, res, next) => {
   if (!req.file) return next();
   req.file.filename = `user-${req.user._id}-${+Date.now()}.jpeg`;

   sharp(req.file.buffer)
      .resize(500, 500)
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toFile(`uploads/users/${req.file.filename}`);

   next();
};

exports.getUserPublicProfile = async (req, res, next) => {
   const user = await User.findById(req.params.id);
   if (!user) next(new AppError('User not found', 404));

   const mutualFriends = req.user.friends.filter(fId =>
      user.friends.includes(fId)
   );
   return res.status(200).json({ status: 'success', user, mutualFriends });
};

exports.updateMe = catchAsyncError(async (req, res, next) => {
   // console.log('File: ', req.file);
   if (req.file) req.body.photo = req.file.filename;

   const user = await User.findByIdAndUpdate(req.user._id, req.body, {
      new: true,
      useFindAndModify: false,
      runValidators: true
   });
   if (!user) next(new AppError('User not found', 404));

   return res.status(200).json({ user, file: req.file });
});
