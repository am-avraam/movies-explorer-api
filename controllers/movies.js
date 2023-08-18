const Movie = require('../models/movie');
const { customErrors, methodCodes, errorMessages } = require('../constants');

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    // owner,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  const { _id } = req.user;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner: _id,
  })
    .then((movie) => res.status(methodCodes.ResourceCreated).send({ data: movie }))
    .catch(next);
};

module.exports.getMovies = (req, res, next) => {
  const { _id } = req.user;
  Movie.find({ owner: _id })
    .then((movies) => res.send({ data: movies }))
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  const { id } = req.params;
  const { _id } = req.user;

  Movie.findById(id)
    .then((movie) => {
      if (!movie) return next(new customErrors.NotFound(errorMessages.CARD_NOT_FOUND));

      if (movie?.owner._id.toString() === _id) {
        return Movie.findByIdAndRemove(id)
          .then((deletedMovie) => (deletedMovie
            ? res.send({ data: deletedMovie })
            : next(new customErrors.NotFound())))
          .catch(next);
      }

      throw new customErrors.ForbiddenError(errorMessages.NO_AUTHORITY);
    })
    .catch(next);
};
