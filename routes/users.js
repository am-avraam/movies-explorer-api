const router = require('express').Router();
const {
  patchUser, getSelf,
} = require('../controllers/users');
const { patchUserValidation } = require('../middlewares/validation');

router.get('/me', getSelf);
router.patch('/me', patchUserValidation, patchUser);

module.exports = router;
