const mongoose = require('mongoose');
const validator = require('validator');

const movieSchema = new mongoose.Schema(
  {
    country: {
      type: String,
      required: true,
    },
    director: {
      type: String,
      required: true,
    },

    duration: {
      type: Number,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
      match: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/,
      validate: {
        validator: (v) => validator.isURL(v),
        message: 'Проверьте правильность введенного URL',
      },
    },
    trailerLink: {
      type: String,
      required: true,
      match: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/,
      validate: {
        validator: (v) => validator.isURL(v),
        message: 'Проверьте правильность введенного URL',
      },
    },
    thumbnail: {
      type: String,
      required: true,
      match: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/,
      validate: {
        validator: (v) => validator.isURL(v),
        message: 'Проверьте правильность введенного URL',
      },
    },
    owner: {
      required: true,
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
    movieId: {
      required: true,
      type: Number,
    },
    nameRU: {
      type: String,
      required: true,
    },
    nameEN: {
      type: String,
      required: true,

    },
  },
  { versionKey: false },
);

module.exports = mongoose.model('movie', movieSchema);
