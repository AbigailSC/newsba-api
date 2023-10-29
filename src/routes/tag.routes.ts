import { Router } from 'express';
import {
  postTag,
  updateTag,
  getTagById,
  getAllTags,
  deleteTagById
} from '@controllers';

const router: Router = Router();

router.route('/').get(getAllTags).post(postTag);

router.route('/:id').get(getTagById).put(updateTag).delete(deleteTagById);

export default router;
