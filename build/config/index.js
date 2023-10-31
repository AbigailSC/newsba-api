"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _config = require("./config");
Object.keys(_config).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _config[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _config[key];
    }
  });
});
var _db = require("./db.config");
Object.keys(_db).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _db[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _db[key];
    }
  });
});
var _nodemailer = require("./nodemailer.config");
Object.keys(_nodemailer).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _nodemailer[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _nodemailer[key];
    }
  });
});