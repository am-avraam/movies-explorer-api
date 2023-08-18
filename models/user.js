const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');
const { customErrors, errorMessages } = require('../constants');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      match: /\w+@\w+\.\w+/,
      validate: {
        validator: (v) => validator.isEmail(v),
        message: errorMessages.CHECK_EMAIL,
      },
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    name: {
      required: true,
      type: String,
      minlength: 2,
      maxlength: 30,
    },
  },
  { versionKey: false },
);

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new customErrors.AuthError(errorMessages.INCORRECT_AUTH_DATA));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new customErrors.AuthError(errorMessages.INCORRECT_AUTH_DATA));
          }

          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
