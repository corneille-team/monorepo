import { COOKIES_NAMES, getCookie, removeCookie } from '../utils';
import callApi from '../middlewares/callApi';

export const GET_COMPANY_SUCCESS = 'GET_COMPANY_SUCCESS';
export const GET_COMPANY_FAILURE = 'GET_COMPANY_FAILURE';

export async function getCompany() {
  try {
    const token = getCookie(COOKIES_NAMES.token);
    if (!token) {
      removeCookie(COOKIES_NAMES.token);

      return {
        type: GET_COMPANY_FAILURE,
      };
    }

    const user = await callApi({
      method: 'GET',
      url: '/companies/me',
    });

    return {
      type: GET_COMPANY_SUCCESS,
      response: user,
    };
  } catch (err) {
    return {
      type: GET_COMPANY_FAILURE,
    };
  }
}
