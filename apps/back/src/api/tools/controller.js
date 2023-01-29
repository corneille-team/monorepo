import { toolsType, usageStatusType } from 'lib-enums';
import httpStatus from 'http-status';
import axios from 'axios';

import { uesToolService } from '../../../../../libs/tools';
import { companiesRepository } from '../../repositories';
import { countWords } from '../../../../../libs/utils';
import { promptByToolName } from '../../../../../libs/mappers';

async function useTool(req, res) {
  const { user } = req.locals;

  const company = await companiesRepository.getCompanyById(user.company_id);
  if (!company) {
    return res.status(httpStatus.NOT_FOUND).send({ error: 'Company not found' });
  }

  if (company.subscription.words <= 0) {
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

  if (!Object.keys(toolsType).includes(toolName)) {
    return res.status(httpStatus.BAD_REQUEST).send({ error: 'Service not found' });
  }

  const payload = {
    language: req.query.language,
    subject: req.query.subject,
    tone: req.query.tone,
    formality: req.query.formality,
    max_tokens: 3000,
    user_id: user._id,
    n: req.query.output,
  };

  if (req.query.linkedin_url) {
    const { data } = await axios({
      method: 'GET',
      params: {
        url: req.query.linkedin_url,
        fallback_to_cache: 'on-error',
        use_cache: 'if-present',
        skills: 'include',
        inferred_salary: 'include',
      },
    });

    payload.linkedinData = `${data.full_name}, ${data.occupation}, ${
      data.summary
    }. Experiences: ${data.experiences.map((exp) => exp.title + ' at ' + exp.company).join(', ')}`;

    console.log({ linkedinData: payload.linkedinData, length: payload.linkedinData.length });
  }

  const prompt = promptByToolName(toolName, payload);

  let completion;
  try {
    const { data } = await uesToolService(prompt, payload);
    completion = data;
  } catch (err) {
    console.log(err);
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .send({ error: 'Request to IA Failed: ' + err });
  }

  const usage = completion.usage;

  if (!completion.choices || !completion.choices.length) {
    const newUsages = company.usages || [];
    newUsages.push({
      user_id: String(user._id),
      service: toolName,
      document_name: null,
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

  let documentName = req.query.document_name;
  if (newUsages.find((u) => u.document_name === documentName && u.service === toolName)) {
    documentName = null;
  }

  newUsages.push({
    user_id: String(user._id),
    service: toolName,
    document_name: documentName,
    input: {
      subject: req.query.subject,
      content: req.query.content,
      language: req.query.language,
      tone: req.query.tone,
      formality: req.query.formality,
      request: req.query.output,
    },
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

  return res.send({ data: results });
}

export const toolsController = {
  useTool,
};
