"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateArticleViewByCatedoryId = exports.postView = void 0;
var _middlewares = require("../middlewares");
var _models = require("../models");
const postView = (0, _middlewares.catchAsync)(async (req, res) => {
  const {
    articleId
  } = req.body;
  const newView = new _models.View({
    articleId,
    views: 0
  });
  if (!newView) {
    return res.status(400).json({
      status: res.statusCode,
      message: 'Error creating view'
    });
  }
  await newView.save();
  res.status(201).json({
    status: res.statusCode,
    message: 'View created',
    data: newView
  });
});
exports.postView = postView;
const updateArticleViewByCatedoryId = (0, _middlewares.catchAsync)(async (req, res) => {
  const {
    categoryId
  } = req.params;
  const existsView = await _models.View.findById(categoryId);
  if (!existsView) {
    return res.status(400).json({
      status: res.statusCode,
      message: 'View by category not found'
    });
  }
  const view = await _models.View.findById(categoryId, {
    $inc: {
      seq: 1
    }
  });
  res.status(201).json({
    status: res.statusCode,
    message: 'View by cateogory updated',
    data: view
  });
});
exports.updateArticleViewByCatedoryId = updateArticleViewByCatedoryId;