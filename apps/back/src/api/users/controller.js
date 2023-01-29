import httpStatus from 'http-status';

import { companiesRepository, usersRepository } from '../../repositories';
import { compare, encode } from '../../services';

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

async function changePassword(req, res) {
  const { user } = req.locals;

  const isWrongOldPassword = await compare(req.body.old_password, user.password);
  if (isWrongOldPassword) {
    return res.status(httpStatus.UNPROCESSABLE_ENTITY).send({ error: 'Wrong old password' });
  }

  const isWrongNewPassword = await compare(req.body.new_password, user.password);
  if (isWrongNewPassword) {
    return res
      .status(httpStatus.UNPROCESSABLE_ENTITY)
      .send({ error: 'New password cannot be the same as old password' });
  }

  const hashedNewPassword = await encode(req.body.new_password);

  const { password } = await usersRepository.updateUserById(
    user._id,
    { password: hashedNewPassword },
    ['password'],
  );

  const isPasswordChanged = await compare(req.body.new_password, password);
  if (!isPasswordChanged) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: 'Unknown error' });
  }

  return res.status(httpStatus.OK).end();
}

async function getCompanyMembers(req, res) {
  const { user } = req.locals;

  const company = await companiesRepository.getCompanyById(user.company_id);
  if (!company) {
    return res.status(httpStatus.NOT_FOUND).end();
  }

  const members = await usersRepository.getUsers({ _id: { $in: company.members_ids } });

  return res.send(members);
}

export default {
  me,
  getPicture,
  updateMe,
  changePassword,
  getCompanyMembers,
};
