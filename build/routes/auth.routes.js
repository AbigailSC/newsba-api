"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = require("express");
var _controllers = require("../controllers");
var _expressValidator = require("express-validator");
var _middlewares = require("../middlewares");
var _validations = require("../validations");
const router = (0, _express.Router)();
router.route('/register').post([..._validations.verifyCreate, (0, _expressValidator.check)('username', 'Username is required').not().isEmpty(), (0, _expressValidator.check)('email').custom(_validations.emailExists), _middlewares.recolectErrors], _controllers.register);
router.route('/login').post([..._validations.verifyCreate, _middlewares.recolectErrors], _controllers.login);
router.route('/verify').patch([..._validations.verifyCode, ..._validations.verifyEmail, _middlewares.recolectErrors], _controllers.verifyAccount);
var _default = router;
exports.default = _default;