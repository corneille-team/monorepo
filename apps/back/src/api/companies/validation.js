import Joi from 'joi';

export const inviteMemberValidation = Joi.object({
  email: Joi.string().required(),
});
