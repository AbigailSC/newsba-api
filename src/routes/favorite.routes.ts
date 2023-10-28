import { Router } from 'express';
import { getFavoritesByUser, addFavorite } from '@controllers';

const router: Router = Router();

router.route('/').get(getFavoritesByUser).post(addFavorite);

export default router;
