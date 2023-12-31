import { Request, Response, NextFunction } from 'express';
import { Result, ValidationError, validationResult } from 'express-validator';

type ControllerFunction = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<unknown>;

type CatchAsyncMiddleware = (
  fn: ControllerFunction
) => (req: Request, res: Response, next: NextFunction) => void;

export const catchAsync: CatchAsyncMiddleware =
  (fn) => async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: res.statusCode,
        message: 'Internal server error'
      });
    }
  };

export const recolectErrors = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const errors: Result<ValidationError> = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
  } else {
    next();
  }
};
