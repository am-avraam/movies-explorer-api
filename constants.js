// eslint-disable-next-line max-classes-per-file
const errorMessages = {
  NO_DATA: 'Данные отсутствуют',
  NO_ROUTE: 'Маршрут не найден',
  NEED_AUTHORIZATION: 'Необходима авторизация',
  INCORRECT_DATA: 'Переданы некорректные данные',
  INCORRECT_ID: 'Некорректный id',
  EMAIL_OCCUPIED: 'Пользователь с таким email уже зарегистрирован',
  SERVER_ERROR: 'На сервере произошла ошибка',
  CHECK_EMAIL: 'Проверьте правильность введенного Email',
  INCORRECT_AUTH_DATA: 'Неправильные почта или пароль',
  CHECK_URL: 'Проверьте правильность введенного URL',
  CARD_NOT_FOUND: 'Карточка не найдена',
  NO_AUTHORITY: 'Недостаточно прав',
};

const methodCodes = {
  BadRequest: 400,
  NotFound: 404,
  DefaultCode: 500,
  ResourceCreated: 201,
  ResourceAlreadyExist: 409,
};

const customErrors = {
  NotFound: class NotFoundError extends Error {
    constructor(message) {
      super(message);
      if (!message) this.message = errorMessages.NO_DATA;

      this.name = 'NotFoundError';
      this.statusCode = 404;
    }
  },

  AuthError: class AuthError extends Error {
    constructor(message) {
      super(message);
      this.name = 'AuthError';
      this.statusCode = 401;
    }
  },

  ForbiddenError: class ForbiddenError extends Error {
    constructor(message) {
      super(message);
      this.name = 'ForbiddenError';
      this.statusCode = 403;
    }
  },
};

module.exports = {
  errorMessages,
  methodCodes,
  customErrors,
};
