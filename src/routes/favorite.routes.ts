import { Router } from 'express';
import { getFavoritesByUser, addFavorite, deleteFavorite } from '@controllers';

const router: Router = Router();

router.route('/').get(getFavoritesByUser).post(addFavorite);

router.route('/:id').delete(deleteFavorite);

export default router;
