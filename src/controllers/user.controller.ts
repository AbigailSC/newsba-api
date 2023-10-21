import { RequestHandler } from 'express';
import { catchAsync } from '@middlewares';
import { UserType } from '@interfaces';
import { User } from '@models';

export const updateUser: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { password }: UserType = req.body;
  try {
    const updateUser = await User.findById(id);
    if (updateUser === null)
      return res.status(500).json({
        status: res.statusCode,
        message: 'User not found'
      });
    const encryptedPassword = await updateUser.encryptPassword(password);
    await User.findByIdAndUpdate(id, {
      password: encryptedPassword,
      verified: true
    });
    res.json({
      status: res.statusCode,
      message: 'User updated'
    });
  } catch (error) {
    console.log(error);
  }
});

export const getUserById: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (user === null) {
    return res.json({ status: res.statusCode, message: 'User not found!' });
  }
  res.json({
    status: res.statusCode,
    message: 'User found',
    data: user
  });
});
