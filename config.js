require('dotenv').config();

const {
  NODE_ENV,
  JWT_SECRET = 'diploma',
} = process.env;

module.exports = {
  NODE_ENV, JWT_SECRET,
};
