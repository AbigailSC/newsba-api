"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _auth = require("./auth.middleware");
Object.keys(_auth).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _auth[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _auth[key];
    }
  });
});
var _getErrors = require("./getErrors");
Object.keys(_getErrors).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _getErrors[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _getErrors[key];
    }
  });
});