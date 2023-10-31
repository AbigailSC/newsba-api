"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateAnalysis = exports.getAnalysisById = exports.getAnalysisByCategory = exports.deleteAnalysis = exports.createAnalysis = void 0;
var _middlewares = require("../middlewares");
var _models = require("../models");
const createAnalysis = (0, _middlewares.catchAsync)(async (req, res) => {
  const {
    title,
    image,
    average,
    pros,
    resume,
    articleId
  } = req.body;
  const analysis = new _models.Analysis({
    title,
    image,
    average,
    pros,
    resume,
    articleId,
    authorId: req.body.userConfirm._id
  });
  if (!analysis) {
    return res.status(400).json({
      status: res.statusCode,
      message: 'Error creating analysis'
    });
  }
  const analysisExists = await _models.Analysis.findOne({
    articleId
  });
  if (analysisExists) {
    return res.status(400).json({
      status: res.statusCode,
      message: 'Analysis already exists'
    });
  }
  await analysis.save();
  const articleModified = await _models.Article.findOneAndUpdate({
    _id: articleId
  }, {
    analysis: analysis._id
  });
  console.log('🚀 ~ file: analysis.controller.ts:40 ~ constcreateAnalysis:RequestHandler=catchAsync ~ articleModified:', articleModified);
  res.status(200).json({
    status: res.statusCode,
    message: 'Analysis created',
    data: articleModified
  });
});
exports.createAnalysis = createAnalysis;
const updateAnalysis = (0, _middlewares.catchAsync)(async (req, res) => {
  const {
    title,
    image,
    average,
    pros,
    resume
  } = req.body;
  const {
    id
  } = req.params;
  const analysisModified = await _models.Analysis.findOneAndUpdate({
    _id: id
  }, {
    title,
    image,
    average,
    pros,
    resume
  });
  if (!analysisModified) {
    return res.status(400).json({
      status: res.statusCode,
      message: 'Error updating analysis'
    });
  }
  res.status(200).json({
    status: res.statusCode,
    message: 'Analysis updated',
    data: analysisModified
  });
});
exports.updateAnalysis = updateAnalysis;
const deleteAnalysis = (0, _middlewares.catchAsync)(async (req, res) => {
  const {
    id
  } = req.params;
  const analysisDeleted = await _models.Analysis.findByIdAndDelete(id);
  if (!analysisDeleted) {
    return res.status(400).json({
      status: res.statusCode,
      message: 'Error deleting analysis'
    });
  }
  await _models.Article.findOneAndUpdate({
    analysis: id
  }, {
    analysis: null
  });
  res.status(200).json({
    status: res.statusCode,
    message: 'Analysis deleted',
    data: analysisDeleted
  });
});
exports.deleteAnalysis = deleteAnalysis;
const getAnalysisById = (0, _middlewares.catchAsync)(async (req, res) => {
  const {
    id
  } = req.params;
  const analysis = await _models.Analysis.findById(id);
  if (!analysis) {
    return res.status(400).json({
      status: res.statusCode,
      message: 'Error getting analysis'
    });
  }
  res.status(200).json({
    status: res.statusCode,
    message: 'Analysis found',
    data: analysis
  });
});
exports.getAnalysisById = getAnalysisById;
const getAnalysisByCategory = (0, _middlewares.catchAsync)(async (req, res) => {
  const {
    page = 1,
    limit = 10
  } = req.query;
  const analysisByCategory = await _models.Article.find({
    analysis: {
      $ne: null
    }
  }).sort({
    createdAt: -1
  }).populate('views mainTag tags analysis author').limit(limit).skip((page - 1) * limit);
  if (analysisByCategory === null) {
    return res.status(400).json({
      status: res.statusCode,
      message: 'Error getting analysis'
    });
  }
  const analysisLength = analysisByCategory.length;
  const analysisResponse = {
    totalPages: Math.ceil(analysisLength / limit),
    currentPage: page,
    hasNextPage: page < Math.ceil(analysisLength / limit),
    hasPreviousPage: page > 1,
    data: analysisByCategory
  };
  res.status(200).json({
    status: res.statusCode,
    message: 'Analysis obtained',
    data: analysisResponse
  });
});
exports.getAnalysisByCategory = getAnalysisByCategory;