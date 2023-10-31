"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateJWT = void 0;
var _config = require("../config");
var _jsonwebtoken = require("jsonwebtoken");
const generateJWT = async (id = '') => {
  const payload = {
    id
  };
  return await new Promise((resolve, reject) => {
    (0, _jsonwebtoken.sign)(payload, _config.config.auth.jwtSecret, {
      expiresIn: _config.config.auth.jwtExpires
    }, (err, token) => {
      if (err) {
        console.log(err);
        reject(new Error('Error generating token'));
      } else {
        resolve(token);
      }
    });
  });
};
exports.generateJWT = generateJWT;