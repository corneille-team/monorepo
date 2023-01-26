import { toolsType, subscriptionsType, usageStatusType } from 'lib-enums';
import httpStatus from 'http-status';

import { servicesLib } from '../../../../../libs/tools';
import { companiesRepository } from '../../repositories';
import { countWords } from '../../../../../libs/utils';
import { promptByToolName } from '../../../../../libs/mappers';

function getService(name) {
  switch (name) {
    case toolsType.youtube_script:
      return servicesLib.youtube_script;
      nvm;
    default:
      return null;
  }
}

async function useTool(req, res) {
  const { user } = req.locals;

  const company = await companiesRepository.getCompanyByUserId(user._id);
  if (!company) {
    return res.status(httpStatus.NOT_FOUND).send({ error: 'Company not found' });
  }

  if (company.subscription.plan === subscriptionsType.free && company.subscription.words <= 0) {
    return res.status(httpStatus.UNPROCESSABLE_ENTITY).send({ error: 'Not enough words' });
  }

  const toolName = req.params.tool;

  if (!Object.keys(toolsType).includes(toolName)) {
    return res.status(httpStatus.BAD_REQUEST).send({ error: 'Service name not found' });
  }

  const subject = req.query.subject;

  if (subject.length > 2000) {
    return res
      .status(httpStatus.BAD_REQUEST)
      .send({ error: 'Prompt cannot be longer than 2000 caracters' });
  }

  const service = getService(toolName);
  if (!service) {
    return res.status(httpStatus.BAD_REQUEST).send({ error: 'Service not found' });
  }

  const payload = {
    language: req.query.language,
    subject: req.query.subject,
    tone: req.query.tone,
    n: req.query.output,
  };

  const prompt = promptByToolName(toolName, payload);

  const { data: completion } = await service(prompt, payload);

  if (!completion) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: 'Request Failed' });
  }

  const usage = completion.usage;

  if (!completion.choices || !completion.choices.length) {
    const newUsages = company.usages || [];
    newUsages.push({
      user_id: String(user._id),
      service: toolName,
      document_name: req.query.document_name,
      prompt,
      results: null,
      tokens_used: usage ? usage.total_tokens : 0,
      completion_id: completion.id,
      generation_date: new Date(),
      status: usageStatusType.failure,
    });

    await companiesRepository.updateCompanyById(company._id, {
      usages: newUsages,
    });

    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: 'Response invalid' });
  }

  const choices = completion.choices;

  const wordsGenerated = choices.reduce((initial, curr) => initial + countWords(curr.text), 0);

  const results = choices.map((d) => ({ text: d.text }));

  const newUsages = company.usages || [];
  newUsages.push({
    user_id: String(user._id),
    service: toolName,
    document_name: req.query.document_name,
    prompt,
    results,
    tokens_used: usage ? usage.total_tokens : 0,
    completion_id: completion.id,
    generation_date: new Date(),
    status: usageStatusType.success,
  });

  const lastWords = company.subscription.words - wordsGenerated;
  await companiesRepository.updateCompanyById(company._id, {
    usages: newUsages,
    'subscription.words': lastWords > 0 ? lastWords : 0,
  });

  return res.send({ data: results.map((r) => r.text) });
}

export const toolsController = {
  useTool,
};
