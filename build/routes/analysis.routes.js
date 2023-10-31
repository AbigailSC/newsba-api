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
router.route('/').get(_controllers.getAnalysisByCategory).post([(0, _middlewares.verifyRoles)([_constants.ROLES.ADMIN, _constants.ROLES.WRITTER]), ..._validations.verifyAnalysis, _middlewares.recolectErrors], _controllers.createAnalysis);
router.route('/:id').get(_controllers.getAnalysisById).put([(0, _middlewares.verifyRoles)([_constants.ROLES.ADMIN, _constants.ROLES.WRITTER]), ..._validations.verifyAnalysis, _middlewares.recolectErrors], _controllers.updateAnalysis).delete([(0, _middlewares.verifyRoles)([_constants.ROLES.ADMIN, _constants.ROLES.WRITTER]), _middlewares.recolectErrors], _controllers.deleteAnalysis);
var _default = router;
exports.default = _default;