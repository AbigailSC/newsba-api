"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _body = require("./body.validations");
Object.keys(_body).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _body[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _body[key];
    }
  });
});
var _db = require("./db.validations");
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