import { Router } from 'express';
import {
  postCategory,
  updateCategory,
  getCategoryById,
  getAllCategories,
  deleteCategoryById
} from '@controllers';

const router: Router = Router();

router.route('/').get(getAllCategories).post(postCategory);

router
  .route('/:id')
  .get(getCategoryById)
  .put(updateCategory)
  .delete(deleteCategoryById);

export default router;
