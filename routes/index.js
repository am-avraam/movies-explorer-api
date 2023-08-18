const router = require('express').Router();
const {
  loginValidation,
  signupValidation,
} = require('../middlewares/validation');
const {
  login,
  createUser,
} = require('../controllers/users');
const auth = require('../middlewares/auth');

router.post('/signin', loginValidation, login);
router.post('/signup', signupValidation, createUser);

router.use(auth);

router.use('/users', require('./users'));
router.use('/movies', require('./movies'));

module.exports = router;
