import httpStatus from 'http-status';

import { companiesRepository } from '../../repositories';

async function me(req, res) {
  const { user } = req.locals;

  const company = await companiesRepository.getCompanyByUserId(user._id);

  return res.send(company);
}

async function inviteMember(req, res) {
  const { user } = req.locals;

  const company = await companiesRepository.getCompanyByUserId(user._id);
  if (String(user._id) !== company.owner_id) {
    return res.status(httpStatus.FORBIDDEN).send({ error: 'You must be owner of the company' });
  }

  //send mail invitation

  return res.status(httpStatus.OK).end();
}

export default {
  me,
  inviteMember,
};
