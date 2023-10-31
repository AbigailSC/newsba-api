"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _analysis = require("./analysis.interfaces");
Object.keys(_analysis).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _analysis[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _analysis[key];
    }
  });
});
var _article = require("./article.interfaces");
Object.keys(_article).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _article[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _article[key];
    }
  });
});
var _category = require("./category.interfaces");
Object.keys(_category).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _category[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _category[key];
    }
  });
});
var _favorite = require("./favorite.interfaces");
Object.keys(_favorite).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _favorite[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _favorite[key];
    }
  });
});
var _query = require("./query.interfaces");
Object.keys(_query).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _query[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _query[key];
    }
  });
});
var _tag = require("./tag.interfaces");
Object.keys(_tag).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _tag[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _tag[key];
    }
  });
});
var _user = require("./user.interfaces");
Object.keys(_user).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _user[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _user[key];
    }
  });
});
var _view = require("./view.interfaces");
Object.keys(_view).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _view[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _view[key];
    }
  });
});