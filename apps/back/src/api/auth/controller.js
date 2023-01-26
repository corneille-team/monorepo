import httpStatus from 'http-status';
import { subscriptionsType, usersRolesType } from 'lib-enums';

import { companiesRepository, usersRepository } from '../../repositories';
import { compare, createToken, encode } from '../../services';
import configs from '../../configs';

async function signIn(req, res) {
  const email = req.body.email;
  const password = req.body.password;

  const user = await usersRepository.getUser({ email, role: req.body.user_type }, ['password']);
  if (!user) {
    return res.status(httpStatus.BAD_REQUEST).send({ error: 'wrong_identifiers' });
  }

  const isPasswordChecked = await compare(password, user.password);
  if (!isPasswordChecked) {
    return res.status(httpStatus.BAD_REQUEST).send({ error: 'wrong_identifiers' });
  }

  const token = createToken({
    issuerId: user._id,
    userId: user._id,
    role: user.role,
    givenName: `${user.first_name} ${user.last_name}`,
  });

  return res.send({ token });
}

async function signUp(req, res) {
  const { first_name, last_name, email, phone, password } = req.body;

  const hashedPassword = await encode(password);

  let user = await usersRepository.createUser({
    first_name,
    last_name,
    email,
    phone,
    password: hashedPassword,
  });

  if (!user) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).end();
  }

  const company = await companiesRepository.createCompany({
    owner_id: String(user._id),
    members_ids: [String(user._id)],
    subscription: {
      plan: subscriptionsType.free,
      words: configs.freeTrialWords,
      seats: 1,
      subscription_date: new Date(),
    },
    usages: [],
  });

  user = await usersRepository.updateUserById(user._id, { company_id: String(company._id) });

  const token = createToken({
    issuerId: user._id,
    userId: user._id,
    role: user.role,
    givenName: `${user.first_name} ${user.last_name}`,
  });

  return res.send({ token });
}

async function signInImpersonate(req, res) {
  const { user } = req.locals;

  if (user.role !== usersRolesType.admin) {
    return res.status(httpStatus.FORBIDDEN).end();
  }

  const impersonate = await usersRepository.getUserById(req.body.user_id);
  if (!impersonate) {
    return res.status(httpStatus.NOT_FOUND).end();
  }

  const token = createToken({
    issuerId: user._id,
    userId: impersonate._id,
    role: impersonate.role,
    givenName: `${impersonate.first_name} ${impersonate.last_name}`,
  });

  return res.send({ token });
}

export default {
  signUp,
  signIn,
  signInImpersonate,
};
