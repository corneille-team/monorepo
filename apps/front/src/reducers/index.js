import { combineReducers } from 'redux';

import { companyReducers as company } from './company';
import { resultReducers as result } from './result';
import { userReducers as user } from './user';

export default combineReducers({ user, company, result });
