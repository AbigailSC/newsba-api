import { Router } from 'express';
import { updateUser, getUserById } from '@controllers';

const router: Router = Router();

router.route('/').get(getUserById).put(updateUser);

export default router;
