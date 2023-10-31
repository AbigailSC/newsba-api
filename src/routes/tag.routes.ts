import { Router } from 'express';
import {
  postTag,
  updateTag,
  getTagById,
  getAllTags,
  deleteTagById,
  getArticlesByTag
} from '@controllers';

const router: Router = Router();

router.route('/').get(getAllTags).post(postTag);

router.route('/:id').get(getTagById).put(updateTag).delete(deleteTagById);

router.get('/articles/:tag', getArticlesByTag);

export default router;
