import Joi from 'joi';

const useTool = Joi.object({
  document_name: Joi.string().allow(''),
  subject: Joi.string().required(),
  content: Joi.string().required(),
  language: Joi.string(),
  tone: Joi.string(),
  output: Joi.number().min(0).max(5),
});

export const toolsValidation = {
  useTool,
};
