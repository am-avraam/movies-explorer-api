const router = require('express').Router();
const {
  createMovie, deleteMovie, getMovies,
} = require('../controllers/movies');
const { createMovieValidation, idMovieValidation } = require('../middlewares/validation');

router.get('/', getMovies);
router.delete('/:id', idMovieValidation, deleteMovie);
router.post('/', createMovieValidation, createMovie);

module.exports = router;
