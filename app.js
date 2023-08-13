const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');
const { signupValidation, loginValidation } = require('./middlewares/validation');
const { customErrors } = require('./constants');
const errorHandler = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const corsMiddleware = require('./middlewares/cors');

require('dotenv').config();

const { PORT = 3000, BASE_PATH } = process.env;

const app = express();

app.use(requestLogger);

// app.use(cookieParser());
app.use(bodyParser.json()); // для собирания JSON-формата
app.use(bodyParser.urlencoded({ extended: true })); // для приёма веб-страниц внутри POST-запроса

mongoose.connect('mongodb://localhost:27017/movieDB', {
  useNewUrlParser: true,
});

app.use(corsMiddleware);

app.post('/signin', loginValidation, login);
app.post('/signup', signupValidation, createUser);

app.use(auth);

app.use('/users', require('./routes/users'));
app.use('/movies', require('./routes/movies'));

app.use(errorLogger);

app.use(errors());

app.use((req, res, next) => {
  next(new customErrors.NotFound('Маршрут не найден'));
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log(`Ссылка на сервер: ${BASE_PATH}`);
});
