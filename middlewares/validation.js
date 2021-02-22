const { celebrate, Joi } = require('celebrate');

const updateUserValidastion = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
  params: Joi.object().keys({
    id: Joi.string().alphanum().length(24),
  }),
});

const createUservalidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
  params: Joi.object().keys({
    id: Joi.string().hex().length(24),
  }),
});

const deleteMovieValidation = celebrate({
  params: Joi.object().keys({
    movieId: Joi
      .string()
      .alphanum()
      .hex()
      .length(24),
  }),
});

const loginUservalidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
  params: Joi.object().keys({
    id: Joi.string().hex().length(24),
  }),
});

const movieValidation = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required().min(2).max(30),
    director: Joi.string().required().min(2).max(30),
    duration: Joi.number().required(),
    year: Joi.string().required().min(2).max(30),
    description: Joi.string().required().min(2).max(30),
    image: Joi.string().required().regex(/^https?:\/\/(www.)?[\w-]{1,63}\.[\w-]{1,256}[a-z-._~:/?#[\]@!$&'()*+,;=]*#?/i),
    trailer: Joi.string().required().regex(/^https?:\/\/(www.)?[\w-]{1,63}\.[\w-]{1,256}[a-z-._~:/?#[\]@!$&'()*+,;=]*#?/i),
    thumbnail: Joi.string().required().regex(/^https?:\/\/(www.)?[\w-]{1,63}\.[\w-]{1,256}[a-z-._~:/?#[\]@!$&'()*+,;=]*#?/i),
    nameRU: Joi.string().required().min(2).max(30),
    nameEN: Joi.string().required().min(2).max(30),
    movieId: Joi.number().required(),
  }),
  params: Joi.object().keys({
    id: Joi.string().hex().length(24),
  }),
});
module.exports = {
  updateUserValidastion,
  createUservalidation,
  movieValidation,
  loginUservalidation,
  deleteMovieValidation,
};
