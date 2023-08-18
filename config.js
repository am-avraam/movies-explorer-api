require('dotenv').config();

const {
  NODE_ENV,
  JWT_SECRET = 'diploma',
  PORT = 3000,
  BASE_PATH,
} = process.env;

const db = 'mongodb://localhost:27017/bitfilmsdb';

module.exports = {
  PORT, BASE_PATH, NODE_ENV, JWT_SECRET, db,
};
