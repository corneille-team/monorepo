import Router from 'next/router';

import { GET_USER_SUCCESS, UPDATE_USER_SUCCESS, DISCONNECT_USER } from '../actions/user';

export function userReducers(state = null, action) {
  switch (action.type) {
    case UPDATE_USER_SUCCESS:
    case GET_USER_SUCCESS: {
      return { ...action.response } || state;
    }
    case DISCONNECT_USER: {
      Router.reload();
      return null;
    }
    default:
      return state;
  }
}
