import { GET_COMPANY_SUCCESS, REMOVE_HISTORY_SUCCESS } from '../actions/company';

export function companyReducers(state = null, action) {
  switch (action.type) {
    case REMOVE_HISTORY_SUCCESS:
    case GET_COMPANY_SUCCESS: {
      return { ...action.response } || state;
    }
    default:
      return state;
  }
}
