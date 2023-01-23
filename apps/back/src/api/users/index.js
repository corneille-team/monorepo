import * as express from 'express';

import wrapper from '../../utils/wrapper';
import usersController from './controller';
import { joiValidation, tokenMiddleware } from '../../middlewares';
import { updateUserValidation } from './validation';

const router = express.Router({ mergeParams: true });

router.get('/me', tokenMiddleware, wrapper(usersController.me));

router.get('/:userId/picture', tokenMiddleware, wrapper(usersController.getPicture));

router.patch(
  '/',
  tokenMiddleware,
  joiValidation({ body: updateUserValidation }),
  wrapper(usersController.updateMe),
);

export default router;
