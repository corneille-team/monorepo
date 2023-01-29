import Joi from 'joi';

const useTool = Joi.object({
  document_name: Joi.string().allow(''),
  linkedin_url: Joi.string().allow(''),
  subject: Joi.string().allow(''),
  content: Joi.string().allow(''),
  language: Joi.string(),
  formality: Joi.string(),
  tone: Joi.string(),
  output: Joi.number().min(1).max(5),
});

export const toolsValidation = {
  useTool,
};
