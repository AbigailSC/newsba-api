"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyEmail = exports.verifyCreate = exports.verifyCode = exports.verifyArticle = exports.verifyAnalysis = void 0;
var _middlewares = require("../middlewares");
var _expressValidator = require("express-validator");
const verifyCreate = [(0, _expressValidator.check)('email', 'Email is required').exists().not().isEmpty(), (0, _expressValidator.check)('email').isEmail().withMessage('Email format invalid'), (0, _expressValidator.check)('email').normalizeEmail().escape(), (0, _expressValidator.check)('password', 'Password is required').not().isEmpty(), (0, _expressValidator.check)('password', 'Password should have at least 8 chars, 1 lowercase, 1 uppercase, 1 number, 1 symbol').isStrongPassword(), (req, res, next) => {
  (0, _middlewares.recolectErrors)(req, res, next);
}];
exports.verifyCreate = verifyCreate;
const verifyCode = [(0, _expressValidator.check)('code', 'Code is required').not().isEmpty(), (0, _expressValidator.check)('code', 'Code should have 5 chars').isLength({
  min: 5,
  max: 5
}), (req, res, next) => {
  (0, _middlewares.recolectErrors)(req, res, next);
}];
exports.verifyCode = verifyCode;
const verifyEmail = [(0, _expressValidator.check)('email', 'Email is required').not().isEmpty(), (0, _expressValidator.check)('email', 'Email format invalid').isEmail(), (0, _expressValidator.check)('email').normalizeEmail().escape(), (req, res, next) => {
  (0, _middlewares.recolectErrors)(req, res, next);
}];
exports.verifyEmail = verifyEmail;
const verifyArticle = [(0, _expressValidator.check)('title', 'Title is required').not().isEmpty(), (0, _expressValidator.check)('title', 'Title should have at least 10 chars').isLength({
  min: 10
}), (0, _expressValidator.check)('subTitle', 'SubTitle is required').not().isEmpty(), (0, _expressValidator.check)('subTitle', 'SubTitle should have at least 10 chars').isLength({
  min: 10
}), (0, _expressValidator.check)('article', 'Article is required').not().isEmpty(), (0, _expressValidator.check)('article', 'Article should be an array').isArray(), (0, _expressValidator.check)('imageLanding', 'Image Landing is required').not().isEmpty(), (0, _expressValidator.check)('imageLanding', 'Image Landing format invalid').isURL(), (0, _expressValidator.check)('date', 'Date is required').not().isEmpty(), (req, res, next) => {
  (0, _middlewares.recolectErrors)(req, res, next);
}];
exports.verifyArticle = verifyArticle;
const verifyAnalysis = [(0, _expressValidator.check)('average', 'Average is required').not().isEmpty(), (0, _expressValidator.check)('average', 'Average should be a number').isNumeric(), (0, _expressValidator.check)('average', 'Average should be between 0 and 5').isFloat({
  min: 1,
  max: 10
}), (0, _expressValidator.check)('pros', 'Pros is required').not().isEmpty(), (0, _expressValidator.check)('pros', 'Pros should be an array').isArray(), (0, _expressValidator.check)('pros', 'Pros should have at least 3 items').isLength({
  min: 3
}), (0, _expressValidator.check)('resume', 'Resume is required').not().isEmpty(), (0, _expressValidator.check)('resume', 'Resume should have at least 20 chars').isLength({
  min: 20
}), (req, res, next) => {
  (0, _middlewares.recolectErrors)(req, res, next);
}];
exports.verifyAnalysis = verifyAnalysis;