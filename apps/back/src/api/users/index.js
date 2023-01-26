import * as express from 'express';

import wrapper from '../../utils/wrapper';
import usersController from './controller';
import { joiValidation, tokenMiddleware } from '../../middlewares';
import { changePasswordValidation, updateUserValidation } from './validation';

const router = express.Router({ mergeParams: true });

router.get('/me', tokenMiddleware, wrapper(usersController.me));

router.get('/company', tokenMiddleware, wrapper(usersController.getCompanyMembers));

router.get('/:userId/picture', tokenMiddleware, wrapper(usersController.getPicture));

router.patch(
  '/changePassword',
  tokenMiddleware,
  joiValidation({ body: changePasswordValidation }),
  wrapper(usersController.changePassword),
);

router.patch(
  '/',
  tokenMiddleware,
  joiValidation({ body: updateUserValidation }),
  wrapper(usersController.updateMe),
);

export default router;
