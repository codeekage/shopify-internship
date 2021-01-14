const { Schema } = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
  username: {
    type: String, required: true, unique: true, index: true,
  },
  email: {
    type: String, required: true, unique: true, index: true,
  },
  password: {
    type: String, required: true, select: false, minlength: 8,
  },
  wallet: { type: Number, require: true, default: 0 },
}, { timestamps: true });

UserSchema.path('email').validate((email) => {
  const emailRegex = /^([\w-.]+@([\w-]+\.)+[\w-]{2,4})?$/;
  return emailRegex.test(email);
}, 'The e-mail field cannot be empty.');

UserSchema.pre('save', function hashPassword(next) {
  if (!this.isModified('password')) {
    next();
    return;
  }
  const salt = bcrypt.genSaltSync(10);
  this.password = bcrypt.hashSync(this.password, salt);
  next();
});

UserSchema.methods.comparePassword = function comparePassword(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = UserSchema;
