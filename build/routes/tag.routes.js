"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = require("express");
var _controllers = require("../controllers");
const router = (0, _express.Router)();
router.route('/').get(_controllers.getAllTags).post(_controllers.postTag);
router.route('/:id').get(_controllers.getTagById).put(_controllers.updateTag).delete(_controllers.deleteTagById);
var _default = router;
exports.default = _default;