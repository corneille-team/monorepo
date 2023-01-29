import httpStatus from 'http-status';

import { companiesRepository } from '../../repositories';

async function me(req, res) {
  const { user } = req.locals;

  const company = await companiesRepository.getCompanyById(user.company_id);
  if (!company) {
    return res.status(httpStatus.NOT_FOUND).send({ error: 'Company not found' });
  }

  return res.send(company);
}

async function inviteMember(req, res) {
  const { user } = req.locals;

  const company = await companiesRepository.getCompanyById(user.company_id);
  if (String(user._id) !== company.owner_id) {
    return res.status(httpStatus.FORBIDDEN).send({ error: 'You must be owner of the company' });
  }

  //send mail invitation

  return res.status(httpStatus.OK).end();
}
async function removeHistory(req, res) {
  const { user } = req.locals;

  const company = await companiesRepository.getCompanyById(user.company_id);
  if (!company) {
    return res.status(httpStatus.NOT_FOUND).send({ error: 'Company not found' });
  }

  const completionId = req.params.completion_id;

  const usage = company.usages.find((u) => u.completion_id === completionId);
  if (!usage) {
    return res.status(httpStatus.NOT_FOUND).send({ error: 'Usage not found' });
  }

  const newUsages = company.usages.map((u) =>
    u.completion_id === completionId
      ? {
          ...u,
          document_name: null,
        }
      : u,
  );

  const updatedCompany = await companiesRepository.updateCompanyById(company._id, {
    usages: newUsages,
  });

  return res.send(updatedCompany);
}

export default {
  me,
  inviteMember,
  removeHistory,
};
