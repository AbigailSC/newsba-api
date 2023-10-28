import { RequestHandler } from 'express';
import { catchAsync } from '@middlewares';
import { UserType } from '@interfaces';
import { User } from '@models';
import { ObjectId } from 'mongoose';

export const updateUser: RequestHandler = catchAsync(async (req, res) => {
  const userId: ObjectId = req.body.userConfirm._id;
  const { password }: UserType = req.body;

  const updateUser = await User.findById(userId);
  if (updateUser === null)
    return res.status(500).json({
      status: res.statusCode,
      message: 'User not found'
    });
  const encryptedPassword = await updateUser.encryptPassword(password);
  await User.findByIdAndUpdate(userId, {
    password: encryptedPassword,
    verified: true
  });
  res.json({
    status: res.statusCode,
    message: 'User updated'
  });
});

export const getUserById: RequestHandler = catchAsync(async (req, res) => {
  const userId: ObjectId = req.body.userConfirm._id;
  if (userId === null) {
    return res.json({ status: res.statusCode, message: 'User not found!' });
  }
  res.json({
    status: res.statusCode,
    message: 'User found',
    data: req.body.userConfirm
  });
});
