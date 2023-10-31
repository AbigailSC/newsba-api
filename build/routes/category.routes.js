"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = require("express");
var _controllers = require("../controllers");
const router = (0, _express.Router)();
router.route('/').get(_controllers.getAllCategories).post(_controllers.postCategory);
router.route('/:id').get(_controllers.getCategoryById).put(_controllers.updateCategory).delete(_controllers.deleteCategoryById);
var _default = router;
exports.default = _default;