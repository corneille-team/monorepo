import { combineReducers } from 'redux';

import { projectReducers as project } from './project';
import { resultReducers as result } from './result';
import { userReducers as user } from './user';

export default combineReducers({ user, project, result });
