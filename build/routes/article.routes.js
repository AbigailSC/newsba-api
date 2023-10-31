"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = require("express");
var _controllers = require("../controllers");
var _middlewares = require("../middlewares");
var _validations = require("../validations");
var _constants = require("../constants");
const router = (0, _express.Router)();
router.route('/').get(_controllers.getArticles).post([(0, _middlewares.verifyRoles)([_constants.ROLES.ADMIN, _constants.ROLES.WRITTER]), ..._validations.verifyArticle, _middlewares.recolectErrors], _controllers.postArticle);
router.route('/:id').get(_controllers.getArticle).put([(0, _middlewares.verifyRoles)([_constants.ROLES.ADMIN, _constants.ROLES.WRITTER]), ..._validations.verifyArticle, _middlewares.recolectErrors], _controllers.updateArticle).delete([(0, _middlewares.verifyRoles)([_constants.ROLES.ADMIN, _constants.ROLES.WRITTER]), _middlewares.recolectErrors], _controllers.deleteArticle);
router.get('/latest', _controllers.getArticlesByLatest);
router.get('/most-viewed', _controllers.getArticlesByMostViewed);
router.get('/tag/:tag', _controllers.getArticlesByTag);
var _default = router;
exports.default = _default;