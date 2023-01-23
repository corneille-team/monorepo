import { USE_TOOL_SUCCESS, RESET_RESULT } from '../actions/tools';

export function resultReducers(state = null, action) {
  switch (action.type) {
    case USE_TOOL_SUCCESS: {
      return action.response || state;
    }
    case RESET_RESULT: {
      return null;
    }
    default:
      return state;
  }
}
