"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _generateJWT = require("./generateJWT");
Object.keys(_generateJWT).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _generateJWT[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _generateJWT[key];
    }
  });
});
var _generateSlug = require("./generateSlug");
Object.keys(_generateSlug).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _generateSlug[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _generateSlug[key];
    }
  });
});
var _templates = require("./templates");
Object.keys(_templates).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _templates[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _templates[key];
    }
  });
});