"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateTag = exports.postTag = exports.getTagById = exports.getAllTags = exports.deleteTagById = void 0;
var _middlewares = require("../middlewares");
var _models = require("../models");
const postTag = (0, _middlewares.catchAsync)(async (req, res) => {
  const {
    name
  } = req.body;
  const newTag = new _models.Tag({
    name
  });
  if (!newTag) {
    return res.status(400).json({
      status: res.statusCode,
      message: 'Error creating tag'
    });
  }
  const tagExists = await _models.Tag.findOne({
    name
  });
  if (tagExists) {
    return res.status(400).json({
      status: res.statusCode,
      message: 'Tag already exists'
    });
  }
  await newTag.save();
  res.status(201).json({
    status: res.statusCode,
    message: 'Tag created',
    data: newTag
  });
});
exports.postTag = postTag;
const updateTag = (0, _middlewares.catchAsync)(async (req, res) => {
  const {
    name
  } = req.body;
  const {
    id
  } = req.params;
  const existsTag = await _models.Tag.findById(id);
  if (!existsTag) {
    return res.status(400).json({
      status: res.statusCode,
      message: 'Tag not found'
    });
  }
  const tag = await _models.Tag.findByIdAndUpdate(id, {
    name
  });
  res.status(201).json({
    status: res.statusCode,
    message: 'Tag updated',
    data: tag
  });
});
exports.updateTag = updateTag;
const getTagById = (0, _middlewares.catchAsync)(async (req, res) => {
  const {
    id
  } = req.params;
  const tag = await _models.Tag.findById(id);
  if (!tag) {
    return res.status(400).json({
      status: res.statusCode,
      message: 'Tag not found'
    });
  }
  res.status(200).json({
    status: res.statusCode,
    message: 'Tag found',
    data: tag
  });
});
exports.getTagById = getTagById;
const getAllTags = (0, _middlewares.catchAsync)(async (_req, res) => {
  const tag = await _models.Tag.find();
  if (tag.length < 1) {
    return res.status(204).json({
      status: res.statusCode,
      message: 'No content'
    });
  }
  res.status(200).json({
    status: res.statusCode,
    message: 'All tags',
    data: tag
  });
});
exports.getAllTags = getAllTags;
const deleteTagById = (0, _middlewares.catchAsync)(async (req, res) => {
  const {
    id
  } = req.params;
  const tag = await _models.Tag.findByIdAndDelete(id);
  if (!tag) {
    return res.status(400).json({
      status: res.statusCode,
      message: 'Tag not found'
    });
  }
  res.status(200).json({
    status: res.statusCode,
    message: 'Tag deleted',
    data: tag
  });
});
exports.deleteTagById = deleteTagById;