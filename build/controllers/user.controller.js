"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateUser = exports.getUserById = void 0;
var _middlewares = require("../middlewares");
var _models = require("../models");
const updateUser = (0, _middlewares.catchAsync)(async (req, res) => {
  const userId = req.body.userConfirm._id;
  const {
    password
  } = req.body;
  const updateUser = await _models.User.findById(userId);
  if (updateUser === null) return res.status(500).json({
    status: res.statusCode,
    message: 'User not found'
  });
  const encryptedPassword = await updateUser.encryptPassword(password);
  await _models.User.findByIdAndUpdate(userId, {
    password: encryptedPassword,
    verified: true
  });
  res.json({
    status: res.statusCode,
    message: 'User updated'
  });
});
exports.updateUser = updateUser;
const getUserById = (0, _middlewares.catchAsync)(async (req, res) => {
  const userId = req.body.userConfirm._id;
  if (userId === null) {
    return res.json({
      status: res.statusCode,
      message: 'User not found!'
    });
  }
  res.json({
    status: res.statusCode,
    message: 'User found',
    data: req.body.userConfirm
  });
});
exports.getUserById = getUserById;