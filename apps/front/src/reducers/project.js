import { CHANGE_PROJECT } from '../actions/project';

export function projectReducers(state = null, action) {
  switch (action.type) {
    case CHANGE_PROJECT: {
      return action.name || state;
    }
    default:
      return state;
  }
}
