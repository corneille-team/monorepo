import Joi from 'joi';

export const updateUserValidation = Joi.object({
  first_name: Joi.string(),
  last_name: Joi.string(),
  projects: Joi.array().items(
    Joi.object({
      name: Joi.string().required(),
      description: Joi.string().required(),
    }),
  ),
});
