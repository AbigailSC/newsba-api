import { RequestHandler } from 'express';
import { catchAsync } from '@middlewares';
import { UserType } from '@interfaces';
import { User } from '@models';
import { config, sendEmail } from '@config';
import { ROLES } from '@constants';
import { generate } from 'randomstring';
import { verifyAccountTemplate, generateJWT } from '@utils';

export const register: RequestHandler = catchAsync(async (req, res) => {
  const { email, password, username, role }: UserType = req.body;
  const newUser = new User({
    email,
    username,
    role
  });

  const encryptedPassword = await newUser.encryptPassword(password);
  newUser.password = encryptedPassword;

  const adminKey = req.headers['admin-key'];
  if (adminKey === config.auth.adminKey) {
    newUser.role = ROLES.ADMIN;
  }

  const newCode = generate(5);
  newUser.code = newCode;

  const savedUser = await newUser.save();

  const html = verifyAccountTemplate(newCode);
  await sendEmail(email, html);

  return res.status(201).json({
    status: res.statusCode,
    message: 'User created',
    data: savedUser
  });
});

export const login = catchAsync(async (req, res) => {
  const { email, password }: UserType = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        status: res.statusCode,
        message: 'User not found'
      });
    }

    const match = await user.comparePassword(password);
    if (!match) {
      return res.status(400).json({
        status: res.statusCode,
        message: 'Incorrect password'
      });
    }

    const token = await generateJWT(user.id);

    res.status(202).json({
      status: res.statusCode,
      message: 'User logged',
      data: {
        token
      }
    });
  } catch (error) {
    console.log(error);
  }
});
