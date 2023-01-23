import httpStatus from 'http-status';

import { usersRepository } from '../../repositories';

async function me(req, res) {
  return res.send(req.locals.user);
}

async function updateMe(req, res) {
  const { user } = req.locals;

  const newUser = await usersRepository.updateUserById(user._id, req.body);
  if (!newUser) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).end();
  }

  return res.send(newUser);
}

async function getPicture(req, res) {
  const { userId } = req.params;

  if (String(req.locals.user._id) !== userId) {
    return res.status(httpStatus.FORBIDDEN).end();
  }

  const pictureUrl = await usersRepository.getUserPictureById(userId);

  return res.send({ url: pictureUrl });
}

export default {
  me,
  getPicture,
  updateMe,
};
