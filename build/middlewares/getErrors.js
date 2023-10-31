"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.recolectErrors = exports.catchAsync = void 0;
var _expressValidator = require("express-validator");
const catchAsync = fn => async (req, res, next) => {
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
exports.catchAsync = catchAsync;
const recolectErrors = (req, res, next) => {
  const errors = (0, _expressValidator.validationResult)(req);
  if (!errors.isEmpty()) {
    res.status(400).json({
      errors: errors.array()
    });
  } else {
    next();
  }
};
exports.recolectErrors = recolectErrors;