import * as express from 'express';

import auth from './auth';
import tools from './tools';
import users from './users';

const router = express.Router({ mergeParams: true });

router.use('/api/auth', auth);
router.use('/api/tools', tools);
router.use('/api/users', users);

export default router;
