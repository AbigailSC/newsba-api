"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.emailExists = void 0;
var _config = require("../config");
var _models = require("../models");
var _utils = require("../utils");
const emailExists = async email => {
  const exists = await _models.User.findOne({
    email
  });
  if (exists && exists.verified) {
    throw new Error(`Email ${email} already exists`);
  }
  if (exists && !exists.verified) {
    const html = (0, _utils.verifyAccountTemplate)(exists.code);
    await (0, _config.sendEmail)(email, html);
    throw new Error(`Email ${email} already exists, but it's not verified. A new verification code has been sent to your email.`);
  }
};
exports.emailExists = emailExists;