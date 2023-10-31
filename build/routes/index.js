"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "analysis", {
  enumerable: true,
  get: function () {
    return _analysis.default;
  }
});
Object.defineProperty(exports, "article", {
  enumerable: true,
  get: function () {
    return _article.default;
  }
});
Object.defineProperty(exports, "auth", {
  enumerable: true,
  get: function () {
    return _auth.default;
  }
});
Object.defineProperty(exports, "category", {
  enumerable: true,
  get: function () {
    return _category.default;
  }
});
Object.defineProperty(exports, "favorite", {
  enumerable: true,
  get: function () {
    return _favorite.default;
  }
});
Object.defineProperty(exports, "tag", {
  enumerable: true,
  get: function () {
    return _tag.default;
  }
});
Object.defineProperty(exports, "user", {
  enumerable: true,
  get: function () {
    return _user.default;
  }
});
var _user = _interopRequireDefault(require("./user.routes"));
var _auth = _interopRequireDefault(require("./auth.routes"));
var _favorite = _interopRequireDefault(require("./favorite.routes"));
var _article = _interopRequireDefault(require("./article.routes"));
var _tag = _interopRequireDefault(require("./tag.routes"));
var _category = _interopRequireDefault(require("./category.routes"));
var _analysis = _interopRequireDefault(require("./analysis.routes"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }