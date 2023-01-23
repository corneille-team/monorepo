import { toolsType, subscriptionsType } from 'lib-enums';
import httpStatus from 'http-status';
import { v4 as uuidv4 } from 'uuid';

import { servicesLib } from '../../../../../libs/tools';
import { usersRepository } from '../../repositories';
import { countWords } from '../../../../../libs/utils';

function getService(name) {
  switch (name) {
    case toolsType.youtube_script:
      return servicesLib.youtube_script;
    default:
      return null;
  }
}

async function useTool(req, res) {
  const { user } = req.locals;

  if (user.subscription.plan === subscriptionsType.free && user.subscription.tokens <= 0) {
    return res.status(httpStatus.UNPROCESSABLE_ENTITY).send({ error: 'Not enough credits' });
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

  const completion = await service({
    language: req.query.language,
    subject: req.query.subject,
    tone: req.query.tone,
  });
  if (!completion.data) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: 'Request Failed' });
  }

  const usage = completion.data.usage;

  const id = `retrieve_data: ${uuidv4()}`;

  const userUsage = {
    service: toolName,
    title: req.query.title,
    subject,
    data: id,
    tokens_used: usage.total_tokens,
  };

  const updatedUser = await usersRepository.updateUserById(user._id, {
    usages: user.usages ? [...user.usages, userUsage] : [userUsage],
  });

  if (!completion.data.choices || !completion.data.choices.length) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: 'Response invalid' });
  }

  const data = completion.data.choices[0].text;

  const wordsGenerated = countWords(data);

  const newUsage = updatedUser.usages.find((usage) => usage.data === id);
  if (newUsage) {
    const newUserUsages = updatedUser.usages.filter((usage) => usage.data !== id);
    newUserUsages.push({ ...newUsage, data });

    await usersRepository.updateUserById(user._id, {
      usages: newUserUsages,
      'subscription.words': Math.abs(user.subscription.words - wordsGenerated),
    });
  }

  return res.send({ data });
}

export const toolsController = {
  useTool,
};
