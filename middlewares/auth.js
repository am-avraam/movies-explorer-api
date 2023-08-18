const jwt = require('jsonwebtoken');
const { customErrors } = require('../constants');
const { JWT_SECRET } = require('../config');
const { errorMessages } = require('../constants');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  // const token = req.cookies.jwt;

  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new customErrors.AuthError(errorMessages.NEED_AUTHORIZATION);
  }

  const token = authorization.replace('Bearer ', '');

  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw new customErrors.AuthError(errorMessages.NEED_AUTHORIZATION);
  }

  req.user = payload;
  next();
};
