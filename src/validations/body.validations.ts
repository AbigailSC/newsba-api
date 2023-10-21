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

export const verifyCode = [
  check('code', 'Code is required').not().isEmpty(),
  check('code', 'Code should have 5 chars').isLength({ min: 5, max: 5 }),
  (req: Request, res: Response, next: NextFunction) => {
    recolectErrors(req, res, next);
  }
];

export const verifyEmail = [
  check('email', 'Email is required').not().isEmpty(),
  check('email', 'Email format invalid').isEmail(),
  check('email').normalizeEmail().escape(),
  (req: Request, res: Response, next: NextFunction) => {
    recolectErrors(req, res, next);
  }
];
