import Joi from 'joi';

export const impersonateAuthenticateValidation = Joi.object({
  user_id: Joi.string().required(),
});

export const authenticateValidation = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
  user_type: Joi.string().required(),
});

export const userSignUpValidation = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});
