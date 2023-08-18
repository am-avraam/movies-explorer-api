const { methodCodes } = require('../constants');
const { errorMessages } = require('../constants');
// eslint-disable-next-line no-unused-vars
module.exports = (err, req, res, next) => {
  if (err.name === 'ValidationError') {
    return res.status(methodCodes.BadRequest).send({ message: errorMessages.INCORRECT_DATA });
  }

  if (err.name === 'CastError') {
    return res.status(methodCodes.BadRequest).send({ message: errorMessages.INCORRECT_ID });
  }

  if (err.code === 11000) {
    return res.status(methodCodes.ResourceAlreadyExist).send({
      message: errorMessages.EMAIL_OCCUPIED,
    });
  }

  const { statusCode = 500, message } = err;

  return res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? errorMessages.SERVER_ERROR
        : message,
    });
};
