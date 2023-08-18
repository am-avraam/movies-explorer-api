const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const helmet = require('helmet');
const { db, PORT, BASE_PATH } = require('./config');

const { customErrors } = require('./constants');
const errorHandler = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const corsMiddleware = require('./middlewares/cors');
const router = require('./routes');
const { limiter } = require('./limiter');
const { errorMessages } = require('./constants');
require('dotenv').config();

const app = express();

app.use(helmet());
app.use(limiter);

app.use(requestLogger);

// app.use(cookieParser());
app.use(bodyParser.json()); // для собирания JSON-формата
app.use(bodyParser.urlencoded({ extended: true })); // для приёма веб-страниц внутри POST-запроса

mongoose.connect(db, {
  useNewUrlParser: true,
});

app.use(corsMiddleware);

app.use(router);

app.use(errors());
app.use(errorLogger);

app.use((req, res, next) => {
  next(new customErrors.NotFound(errorMessages.NO_ROUTE));
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log(`Ссылка на сервер: ${BASE_PATH}`);
});
