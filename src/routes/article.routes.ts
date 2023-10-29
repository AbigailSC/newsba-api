import { Router } from 'express';
import {
  postArticle,
  updateArticle,
  deleteArticle,
  getArticle,
  getArticles
} from '@controllers';

import { recolectErrors, verifyRoles } from '@middlewares';
import { verifyArticle } from '@validations';
import { ROLES } from '@constants';

const router: Router = Router();

router
  .route('/')
  .get(getArticles)
  .post(
    [
      verifyRoles([ROLES.ADMIN, ROLES.WRITTER]),
      ...verifyArticle,
      recolectErrors
    ],
    postArticle
  );

router
  .route('/:id')
  .get(getArticle)
  .put(
    [
      verifyRoles([ROLES.ADMIN, ROLES.WRITTER]),
      ...verifyArticle,
      recolectErrors
    ],
    updateArticle
  )
  .delete(
    [verifyRoles([ROLES.ADMIN, ROLES.WRITTER]), recolectErrors],
    deleteArticle
  );

export default router;
