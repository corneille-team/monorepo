import { COOKIES_NAMES, getCookie } from '../utils';
import callApi from '../middlewares/callApi';

export const USE_TOOL_SUCCESS = 'USE_TOOL_SUCCESS';
export const USE_TOOL_FAILURE = 'USE_TOOL_FAILURE';

export async function useTool(tool, data) {
  try {
    const token = getCookie(COOKIES_NAMES.token);
    if (!token) {
      return {
        type: USE_TOOL_FAILURE,
      };
    }

    const ret = await callApi({
      method: 'GET',
      url: `/tools/${tool}`,
      params: {
        title: data.title,
        language: data.language,
        subject: data.subject,
      },
    });

    return {
      type: USE_TOOL_SUCCESS,
      response: ret.data,
    };
  } catch (err) {
    return {
      type: USE_TOOL_FAILURE,
    };
  }
}

export const RESET_RESULT = 'RESET_RESULT';

export function resetResult() {
  return {
    type: RESET_RESULT,
  };
}
