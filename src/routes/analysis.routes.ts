import { Router } from 'express';
import {
  createAnalysis,
  updateAnalysis,
  deleteAnalysis,
  getAnalysisById,
  getAnalysisByCategory
} from '@controllers';

import { recolectErrors, verifyRoles } from '@middlewares';
import { verifyAnalysis } from '@validations';
import { ROLES } from '@constants';

const router: Router = Router();

router
  .route('/')
  .get(getAnalysisByCategory)
  .post(
    [
      verifyRoles([ROLES.ADMIN, ROLES.WRITTER]),
      ...verifyAnalysis,
      recolectErrors
    ],
    createAnalysis
  );

router
  .route('/:id')
  .get(getAnalysisById)
  .put([verifyRoles([ROLES.ADMIN, ROLES.WRITTER])], updateAnalysis)
  .delete(
    [verifyRoles([ROLES.ADMIN, ROLES.WRITTER]), recolectErrors],
    deleteAnalysis
  );

export default router;
