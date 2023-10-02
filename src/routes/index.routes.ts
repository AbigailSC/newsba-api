import { Router } from 'express';
import users from './user.routes';

const router = Router();

router.use('/users', users);

export default router;
