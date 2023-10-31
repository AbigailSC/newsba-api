"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyAccount = exports.register = exports.login = void 0;
var _middlewares = require("../middlewares");
var _models = require("../models");
var _config = require("../config");
var _constants = require("../constants");
var _randomstring = require("randomstring");
var _utils = require("../utils");
const register = (0, _middlewares.catchAsync)(async (req, res) => {
  const {
    email,
    password,
    username
  } = req.body;
  const newUser = new _models.User({
    email,
    username
  });
  const encryptedPassword = await newUser.encryptPassword(password);
  newUser.password = encryptedPassword;
  const adminKey = req.headers['admin-key'];
  if (adminKey === _config.config.auth.adminKey) {
    newUser.role = _constants.ROLES.ADMIN;
  }
  const writterKey = req.headers['writter-key'];
  if (writterKey === _config.config.auth.writter) {
    newUser.role = _constants.ROLES.WRITTER;
  }
  const newCode = (0, _randomstring.generate)(5);
  newUser.code = newCode;
  const savedUser = await newUser.save();
  const html = (0, _utils.verifyAccountTemplate)(newCode);
  await (0, _config.sendEmail)(email, html);
  return res.status(201).json({
    status: res.statusCode,
    message: 'User created',
    data: savedUser
  });
});
exports.register = register;
const login = (0, _middlewares.catchAsync)(async (req, res) => {
  const {
    email,
    password
  } = req.body;
  const user = await _models.User.findOne({
    email
  });
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
  const token = await (0, _utils.generateJWT)(user.id);
  res.status(202).json({
    status: res.statusCode,
    message: 'User logged',
    data: {
      token
    }
  });
});
exports.login = login;
const verifyAccount = (0, _middlewares.catchAsync)(async (req, res) => {
  const {
    email,
    code
  } = req.body;
  const user = await _models.User.findOne({
    email
  });
  if (!user) {
    return res.status(400).json({
      status: res.statusCode,
      message: 'User not found'
    });
  }
  if (user.verified) {
    return res.status(400).json({
      status: res.statusCode,
      message: 'User already verified'
    });
  }
  if (user.code !== code) {
    return res.status(400).json({
      status: res.statusCode,
      message: 'Incorrect code'
    });
  }
  await _models.User.findOneAndUpdate({
    email
  }, {
    verified: true,
    code: ''
  });
  return res.status(200).json({
    status: res.statusCode,
    message: 'User verified'
  });
});
exports.verifyAccount = verifyAccount;