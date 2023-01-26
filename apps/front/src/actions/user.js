import { COOKIES_NAMES, getCookie, removeCookie } from '../utils';
import callApi from '../middlewares/callApi';

export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_FAILURE = 'GET_USER_FAILURE';

export async function getUser() {
  try {
    const token = getCookie(COOKIES_NAMES.token);
    if (!token) {
      removeCookie(COOKIES_NAMES.token);

      return {
        type: GET_USER_FAILURE,
      };
    }

    const user = await callApi({
      method: 'GET',
      url: '/users/me',
    });

    return {
      type: GET_USER_SUCCESS,
      response: user,
    };
  } catch (err) {
    removeCookie(COOKIES_NAMES.token);

    return {
      type: GET_USER_FAILURE,
    };
  }
}

export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAILURE = 'UPDATE_USER_FAILURE';

export async function updateUser(data) {
  try {
    const token = getCookie(COOKIES_NAMES.token);
    if (!token) {
      return {
        type: UPDATE_USER_FAILURE,
      };
    }

    const user = await callApi({
      method: 'PATCH',
      url: '/users',
      data,
    });

    return {
      type: UPDATE_USER_SUCCESS,
      response: user,
    };
  } catch (err) {
    return {
      type: UPDATE_USER_FAILURE,
    };
  }
}

export const UPDATE_PASSWORD_USER_SUCCESS = 'UPDATE_PASSWORD_USER_SUCCESS';
export const UPDATE_PASSWORD_USER_FAILURE = 'UPDATE_PASSWORD_USER_FAILURE';

export async function updatePasswordUser(data) {
  try {
    const token = getCookie(COOKIES_NAMES.token);
    if (!token) {
      return {
        type: UPDATE_PASSWORD_USER_FAILURE,
      };
    }

    const user = await callApi({
      method: 'PATCH',
      url: '/users/changePassword',
      data,
    });

    return {
      type: UPDATE_PASSWORD_USER_SUCCESS,
      response: user,
    };
  } catch (err) {
    return {
      type: UPDATE_PASSWORD_USER_FAILURE,
    };
  }
}

export async function getCompanyMembers() {
  try {
    const token = getCookie(COOKIES_NAMES.token);
    if (!token) {
      return {
        type: UPDATE_PASSWORD_USER_FAILURE,
      };
    }

    return callApi({
      method: 'GET',
      url: '/users/company',
    });
  } catch (err) {
    return [];
  }
}

export const DISCONNECT_USER = 'DISCONNECT_USER';

export function disconnectUser() {
  removeCookie(COOKIES_NAMES.token);

  return {
    type: DISCONNECT_USER,
  };
}
