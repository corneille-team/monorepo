import httpStatus from 'http-status';
import Stripe from 'stripe';
import { paymentsStatusType, settingsCategories } from 'lib-enums';

import { companiesRepository } from '../../repositories';
import configs from '../../configs';
import { formatAmountForStripe } from '../../utils/stripe';
import { plansType } from '../../../../../libs/plans';

const stripe = new Stripe(configs.services.stripe.secretKey, {
  apiVersion: '2022-08-01',
});

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

async function recharge(req, res) {
  const { user } = req.locals;

  const company = await companiesRepository.getCompanyById(user.company_id);
  if (!company) {
    return res.status(httpStatus.NOT_FOUND).send({ error: 'Company not found' });
  }

  if (company.owner_id !== String(user._id)) {
    return res.status(httpStatus.FORBIDDEN).send({ error: 'You need to be owner of the company' });
  }

  const plan = plansType[req.body.plan];
  const price = req.body.price;

  const paymentIntent = await stripe.paymentIntents.create({
    amount: formatAmountForStripe(price, 'eur'),
    currency: 'eur',
    payment_method_types: ['card'],
  });

  return res.send({
    clientSecret: paymentIntent.client_secret,
  });
}

async function subscribeNewPlan(req, res) {
  const { user } = req.locals;

  const company = await companiesRepository.getCompanyById(user.company_id);
  if (!company) {
    return res.status(httpStatus.NOT_FOUND).send({ error: 'Company not found' });
  }

  if (company.owner_id !== String(user._id)) {
    return res.status(httpStatus.FORBIDDEN).send({ error: 'You need to be owner of the company' });
  }

  const price = req.body.price;

  const paymentIntent = await stripe.paymentIntents.create({
    amount: formatAmountForStripe(price, 'eur'),
    currency: 'eur',
    payment_method_types: ['card'],
  });

  return res.send({
    clientSecret: paymentIntent.client_secret,
  });
}

async function subscribeDone(req, res) {
  const paymentIntent = await stripe.paymentIntents.retrieve(req.query.payment_intent);

  if (paymentIntent.status !== paymentsStatusType.succeeded) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).end();
  } else if ({}.payment_status === paymentsStatusType.succeeded) {
    return res.status(httpStatus.CONFLICT).end();
  }

  return res.redirect(
    `${configs.frontUrl}/settings?category=${settingsCategories.plan_and_billing}`,
  );
}

export default {
  me,
  inviteMember,
  removeHistory,
};
