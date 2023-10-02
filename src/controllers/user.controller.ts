import { RequestHandler } from 'express';
import { catchAsync } from '@middlewares';
import { UserType } from '@interfaces';
import { User } from '@models';

export const createUser: RequestHandler = catchAsync(async (req, res) => {
  const { email, password, rol }: UserType = req.body;
  const newUser = new User({
    email,
    rol,
    emailVerifyTokenLink: req.cookies.refreshToken
  });
  const encryptedPassword = await newUser.encryptPassword(password);
  newUser.password = encryptedPassword;
  const savedUser = await newUser.save();

  return res.status(201).json({
    status: res.statusCode,
    message: 'User created',
    data: savedUser
  });
});
