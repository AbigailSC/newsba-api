import { config } from '@config';
import { UserType } from '@interfaces';
import { User } from '@models';
import { NextFunction, Request, RequestHandler, Response } from 'express';
import { JwtPayload, verify } from 'jsonwebtoken';

export const validateJWT = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  const token = req.headers['x-token'] as string;

  if (!token) {
    return res.status(401).json({
      status: res.statusCode,
      message: 'No token provided'
    });
  }

  try {
    const payload = verify(token, config.auth.jwtSecret) as JwtPayload;

    const user: UserType | null = await User.findById(payload.id);

    if (!user) {
      return res.status(401).json({
        status: res.statusCode,
        message: 'User not found'
      });
    }

    req.body.userConfirm = user;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      status: res.statusCode,
      message: 'Error validating token'
    });
  }
};

export const validateVerified = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  const user = req.body.userConfirm as UserType;

  if (!user.verified) {
    return res.status(401).json({
      status: res.statusCode,
      message: 'User not verified'
    });
  }

  next();
};

export const verifyRoles: (roles: string[]) => RequestHandler =
  (roles) => async (req, res, next) => {
    try {
      const user: UserType = req.body.userConfirm;

      if (!roles.includes(user.role))
        return res.status(401).json({
          status: res.statusCode,
          message: 'Unauthorized'
        });

      next();
    } catch (error) {
      console.log(error);
      return res
        .status(401)
        .json({ status: res.statusCode, message: 'Access denied' });
    }
  };
