"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyRoles = exports.validateVerified = exports.validateJWT = void 0;
var _config = require("../config");
var _models = require("../models");
var _jsonwebtoken = require("jsonwebtoken");
const validateJWT = async (req, res, next) => {
  const token = req.headers['x-token'];
  if (!token) {
    return res.status(401).json({
      status: res.statusCode,
      message: 'No token provided'
    });
  }
  try {
    const payload = (0, _jsonwebtoken.verify)(token, _config.config.auth.jwtSecret);
    const user = await _models.User.findById(payload.id);
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
exports.validateJWT = validateJWT;
const validateVerified = async (req, res, next) => {
  const user = req.body.userConfirm;
  if (!user.verified) {
    return res.status(401).json({
      status: res.statusCode,
      message: 'User not verified'
    });
  }
  next();
};
exports.validateVerified = validateVerified;
const verifyRoles = roles => async (req, res, next) => {
  try {
    const user = req.body.userConfirm;
    if (!roles.includes(user.role)) return res.status(401).json({
      status: res.statusCode,
      message: 'Unauthorized'
    });
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      status: res.statusCode,
      message: 'Access denied'
    });
  }
};
exports.verifyRoles = verifyRoles;