import Joi from 'joi';

const useTool = Joi.object({
  subject: Joi.string().required(),
  language: Joi.string(),
  tone: Joi.string(),
  title: Joi.string(),
});

export const toolsValidation = {
  useTool,
};
