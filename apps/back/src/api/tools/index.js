import * as express from 'express';

import wrapper from '../../utils/wrapper';
import { toolsController } from './controller';
import { joiValidation, tokenMiddleware } from '../../middlewares';
import { toolsValidation } from './validation';

const router = express.Router({ mergeParams: true });

router.get(
  '/:tool',
  tokenMiddleware,
  joiValidation({ query: toolsValidation.useTool }),
  wrapper(toolsController.useTool),
);

export default router;
