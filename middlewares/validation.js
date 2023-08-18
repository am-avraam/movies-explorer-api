const { Joi, celebrate } = require('celebrate');

const linkPattern = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;

const emailPattern = /\w+@\w+\.\w+/;

const signupValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().required().email().pattern(emailPattern),
    password: Joi.string().required(),
  }),
});

const loginValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().pattern(emailPattern),
    password: Joi.string().required(),
  }),
});

const patchUserValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().pattern(emailPattern),
    name: Joi.string().min(2).max(30),
  }),
});

/** доработать в соответствии с типом */
const createMovieValidation = celebrate({
  body: Joi.object().keys({

    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.number().required(),
    description: Joi.string().required(),
    image: Joi.string().pattern(linkPattern).required(),
    trailerLink: Joi.string().pattern(linkPattern).required(),
    thumbnail: Joi.string().pattern(linkPattern).required(),
    /** Понять формат id, доработать */
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),

  }),
});

const idMovieValidation = celebrate({
  params: {
    id: Joi.string().length(24).hex().required(),
  },
});

module.exports = {
  signupValidation,
  loginValidation,
  patchUserValidation,
  createMovieValidation,
  idMovieValidation,
};
