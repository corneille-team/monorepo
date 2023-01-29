import * as express from 'express';

import wrapper from '../../utils/wrapper';
import companiesController from './controller';
import { joiValidation, tokenMiddleware } from '../../middlewares';
import { inviteMemberValidation } from './validation';

const router = express.Router({ mergeParams: true });

router.get('/me', tokenMiddleware, wrapper(companiesController.me));

router.post(
  '/invite',
  tokenMiddleware,
  joiValidation({ body: inviteMemberValidation }),
  wrapper(companiesController.inviteMember),
);

router.delete(
  '/history/:completion_id',
  tokenMiddleware,
  wrapper(companiesController.removeHistory),
);

export default router;
