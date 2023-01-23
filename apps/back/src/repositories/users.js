import _ from 'lodash';
import { subscriptionsType, usersRolesType } from 'lib-enums';

import { S3Service } from '../services';
import { getUsersModel } from '../models';
import configs from '../configs';

function parseUser(user, pick = []) {
  if (user) {
    return {
      ..._.omit(user, ['password', 'google_data', 'google_id']),
      ..._.pick(user, pick),
    };
  }
  return null;
}

async function getUsers(filter, pick) {
  const UsersModel = getUsersModel();

  const users = await UsersModel.find(filter).lean();

  return users.map((user) => parseUser(user, pick));
}

async function getUserById(id) {
  const UsersModel = getUsersModel();

  const user = await UsersModel.findById(id).lean();

  return parseUser(user);
}

async function getUser(payload, _pick) {
  const UsersModel = getUsersModel();

  const user = await UsersModel.findOne(payload).lean();

  return parseUser(user, _pick);
}

function getUserPictureById(id) {
  return S3Service.S3GetPath(`users/${id}/picture`);
}

async function createUser(payload) {
  const UsersModel = getUsersModel();

  const user = await UsersModel.create({
    ...payload,
    subscription: { plan: subscriptionsType.free, tokens: configs.freeTrialTokens },
    role: usersRolesType.user,
  });

  return parseUser(user);
}

async function updateUserById(id, changes) {
  const UsersModel = getUsersModel();

  const user = await UsersModel.findOneAndUpdate({ _id: id }, changes, { new: true }).lean();

  return parseUser(user);
}

export const usersRepository = {
  getUsers,
  getUserById,
  getUser,
  getUserPictureById,
  createUser,
  updateUserById,
};
