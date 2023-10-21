import { recolectErrors } from '@middlewares';
import { NextFunction, Request, Response } from 'express';
import { check } from 'express-validator';

export const verifyCreate = [
  check('email', 'Email is required').exists().not().isEmpty(),
  check('email').isEmail().withMessage('Email format invalid'),
  check('email').normalizeEmail().escape(),
  check('password', 'Password is required').not().isEmpty(),
  check(
    'password',
    'Password should have at least 8 chars, 1 lowercase, 1 uppercase, 1 number, 1 symbol'
  ).isStrongPassword(),
  (req: Request, res: Response, next: NextFunction) => {
    recolectErrors(req, res, next);
  }
];
