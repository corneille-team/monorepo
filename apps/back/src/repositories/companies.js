import { getCompaniesModel } from '../models';

function createCompany(payload) {
  const CompaniesModel = getCompaniesModel();

  return CompaniesModel.create(payload);
}

function getCompanyById(id) {
  const CompaniesModel = getCompaniesModel();

  return CompaniesModel.findById(id).lean();
}

function updateCompanyById(companyId, changes) {
  const CompaniesModel = getCompaniesModel();

  return CompaniesModel.findOneAndUpdate({ _id: String(companyId) }, changes, { new: true }).lean();
}

export const companiesRepository = {
  createCompany,
  getCompanyById,
  updateCompanyById,
};
