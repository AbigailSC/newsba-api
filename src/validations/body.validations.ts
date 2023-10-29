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

export const verifyArticle = [
  check('title', 'Title is required').not().isEmpty(),
  check('title', 'Title should have at least 10 chars').isLength({ min: 10 }),
  check('subTitle', 'SubTitle is required').not().isEmpty(),
  check('subTitle', 'SubTitle should have at least 10 chars').isLength({
    min: 10
  }),
  check('article', 'Article is required').not().isEmpty(),
  check('article', 'Article should be an array').isArray(),
  check('imageLanding', 'Image Landing is required').not().isEmpty(),
  check('imageLanding', 'Image Landing format invalid').isURL(),
  check('date', 'Date is required').not().isEmpty(),

  (req: Request, res: Response, next: NextFunction) => {
    recolectErrors(req, res, next);
  }
];

export const verifyAnalysis = [
  check('average', 'Average is required').not().isEmpty(),
  check('average', 'Average should be a number').isNumeric(),
  check('average', 'Average should be between 0 and 5').isFloat({
    min: 0,
    max: 5
  }),
  check('pros', 'Pros is required').not().isEmpty(),
  check('pros', 'Pros should be an array').isArray(),
  check('pros', 'Pros should have at least 3 items').isLength({ min: 3 }),
  check('resume', 'Resume is required').not().isEmpty(),
  check('resume', 'Resume should have at least 20 chars').isLength({ min: 20 }),
  (req: Request, res: Response, next: NextFunction) => {
    recolectErrors(req, res, next);
  }
];
