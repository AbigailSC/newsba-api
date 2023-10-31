"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  Analysis: true,
  Article: true,
  Category: true,
  Favorite: true,
  Tag: true,
  User: true,
  View: true
};
Object.defineProperty(exports, "Analysis", {
  enumerable: true,
  get: function () {
    return _Analysis.default;
  }
});
Object.defineProperty(exports, "Article", {
  enumerable: true,
  get: function () {
    return _Article.default;
  }
});
Object.defineProperty(exports, "Category", {
  enumerable: true,
  get: function () {
    return _Category.default;
  }
});
Object.defineProperty(exports, "Favorite", {
  enumerable: true,
  get: function () {
    return _Favorite.default;
  }
});
Object.defineProperty(exports, "Tag", {
  enumerable: true,
  get: function () {
    return _Tag.default;
  }
});
Object.defineProperty(exports, "User", {
  enumerable: true,
  get: function () {
    return _User.default;
  }
});
Object.defineProperty(exports, "View", {
  enumerable: true,
  get: function () {
    return _View.default;
  }
});
var _Analysis = _interopRequireDefault(require("./Analysis"));
var _Article = _interopRequireDefault(require("./Article"));
var _Category = _interopRequireDefault(require("./Category"));
var _Favorite = _interopRequireDefault(require("./Favorite"));
var _Tag = _interopRequireDefault(require("./Tag"));
var _User = _interopRequireDefault(require("./User"));
var _View = _interopRequireDefault(require("./View"));
var _server = require("./server");
Object.keys(_server).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _server[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _server[key];
    }
  });
});
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }