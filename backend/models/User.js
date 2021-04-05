const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
   username: {
      type: String,
      required: [true, 'Please enter a username'],
      unique: true
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
   photo: { type: String },
   Friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

userSchema.pre('save', async function (next) {
   if (this.isModified('password'))
      this.password = await bcrypt.hash(this.password, 11);
   return next();
});

userSchema.methods.checkPasswordMatch = async function (userPwd, pwdText) {
   return await bcrypt.compare(pwdText, userPwd); // Args must be in this order
};

module.exports = User = mongoose.model('User', userSchema); // Model creation must come last in this file
