import { Router } from 'express';
import { register, login } from '@controllers';
import { check } from 'express-validator';
import { recolectErrors } from '@middlewares';
import { verifyCreate, emailExists } from '@validations';

const router: Router = Router();

router
  .route('/register')
  .post(
    [
      ...verifyCreate,
      check('username', 'Username is required').not().isEmpty(),
      check('email').custom(emailExists),
      recolectErrors
    ],
    register
  );

router.route('/login').post([...verifyCreate, recolectErrors], login);

export default router;
