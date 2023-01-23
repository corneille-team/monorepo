import express from 'express';

import { tokenMiddleware, joiValidation } from '../../middlewares';
import authController from './controller';
import {
  authenticateValidation,
  userSignUpValidation,
  impersonateAuthenticateValidation,
} from './validation';
import wrapper from '../../utils/wrapper';

const router = express.Router({ mergeParams: true });

router.post('/', joiValidation({ body: authenticateValidation }), wrapper(authController.signIn));
router.post(
  '/register',
  joiValidation({ body: userSignUpValidation }),
  wrapper(authController.signUp),
);
router.post(
  '/impersonate',
  tokenMiddleware,
  joiValidation({ body: impersonateAuthenticateValidation }),
  wrapper(authController.signInImpersonate),
);

export default router;
