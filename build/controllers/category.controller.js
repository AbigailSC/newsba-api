"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateCategory = exports.postCategory = exports.getCategoryById = exports.getAllCategories = exports.deleteCategoryById = void 0;
var _middlewares = require("../middlewares");
var _models = require("../models");
const postCategory = (0, _middlewares.catchAsync)(async (req, res) => {
  const {
    name
  } = req.body;
  const newCategory = new _models.Category({
    name
  });
  if (!newCategory) {
    return res.status(400).json({
      status: res.statusCode,
      message: 'Error creating category'
    });
  }
  await newCategory.save();
  res.status(201).json({
    status: res.statusCode,
    message: 'Category created',
    data: newCategory
  });
});
exports.postCategory = postCategory;
const updateCategory = (0, _middlewares.catchAsync)(async (req, res) => {
  const {
    name
  } = req.body;
  const {
    id
  } = req.params;
  const existsCategory = await _models.Category.findById(id);
  if (!existsCategory) {
    return res.status(400).json({
      status: res.statusCode,
      message: 'Category not found'
    });
  }
  const category = await _models.Category.findByIdAndUpdate(id, {
    name
  });
  res.status(201).json({
    status: res.statusCode,
    message: 'Category updated',
    data: category
  });
});
exports.updateCategory = updateCategory;
const getCategoryById = (0, _middlewares.catchAsync)(async (req, res) => {
  const {
    id
  } = req.params;
  const category = await _models.Category.findById(id);
  if (!category) {
    return res.status(400).json({
      status: res.statusCode,
      message: 'Category not found'
    });
  }
  res.status(200).json({
    status: res.statusCode,
    message: 'Category found',
    data: category
  });
});
exports.getCategoryById = getCategoryById;
const getAllCategories = (0, _middlewares.catchAsync)(async (_req, res) => {
  const category = await _models.Category.find();
  if (category.length < 1) {
    return res.status(204).json({
      status: res.statusCode,
      message: 'No content'
    });
  }
  res.status(200).json({
    status: res.statusCode,
    message: 'All categories',
    data: category
  });
});
exports.getAllCategories = getAllCategories;
const deleteCategoryById = (0, _middlewares.catchAsync)(async (req, res) => {
  const {
    id
  } = req.params;
  const category = await _models.Category.findByIdAndDelete(id);
  if (!category) {
    return res.status(400).json({
      status: res.statusCode,
      message: 'Category not found'
    });
  }
  res.status(200).json({
    status: res.statusCode,
    message: 'Category deleted',
    data: category
  });
});
exports.deleteCategoryById = deleteCategoryById;