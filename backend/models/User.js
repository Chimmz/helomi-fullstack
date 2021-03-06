const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
   {
      username: {
         type: String,
         required: [true, 'Please enter a username']
      },
      email: {
         type: String,
         lowercase: true,
         required: [true, 'Please enter a username'],
         unique: true,
         validate: [validator.isEmail, 'Please enter a valid email']
      },
      password: {
         type: String,
         required: [true, 'Please provide a password'],
         minlength: 6,
         select: false
      },
      photo: { type: String, default: 'user-default.jpg' },
      friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
   },
   {
      toJSON: {
         virtuals: true
      }
   }
);

userSchema.pre('save', async function (next) {
   if (this.isModified('password'))
      this.password = await bcrypt.hash(this.password, 11);
   return next();
});

userSchema.pre(/^find/, function (next) {
   // this.populate({
   //    path: 'friends',
   //    select: '-__v -friends'
   // });
   next();
});

userSchema.methods.checkPasswordMatch = async function (userPwd, pwdText) {
   return await bcrypt.compare(pwdText, userPwd); // Args must be in this order
};

module.exports = User = mongoose.model('User', userSchema); // Model creation must come last in this file
