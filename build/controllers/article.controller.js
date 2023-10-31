"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateArticle = exports.postArticle = exports.getArticlesByTag = exports.getArticlesByMostViewed = exports.getArticlesByLatest = exports.getArticles = exports.getArticle = exports.deleteArticle = void 0;
var _middlewares = require("../middlewares");
var _models = require("../models");
var _utils = require("../utils");
const postArticle = (0, _middlewares.catchAsync)(async (req, res) => {
  const {
    title,
    subTitle,
    article,
    imageLanding,
    date,
    images,
    externalData,
    mainTag,
    tags,
    category
  } = req.body;
  const slug = (0, _utils.generateSlug)(title);
  const newArticle = new _models.Article({
    slug,
    title,
    subTitle,
    article,
    imageLanding,
    date,
    images,
    externalData,
    mainTag,
    tags,
    category,
    author: req.body.userConfirm._id
  });
  const view = new _models.View({
    views: 0,
    articleId: newArticle._id
  });
  await view.save();
  newArticle.views = view.id;
  if (!newArticle) {
    return res.status(400).json({
      status: res.statusCode,
      message: 'Error creating article'
    });
  }
  await newArticle.save();
  res.status(201).json({
    status: res.statusCode,
    message: 'Article created'
  });
});
exports.postArticle = postArticle;
const updateArticle = (0, _middlewares.catchAsync)(async (req, res) => {
  const {
    title,
    subTitle,
    article,
    imageLanding,
    images,
    externalData,
    mainTag,
    tags,
    category
  } = req.body;
  const newArticle = await _models.Article.findByIdAndUpdate(req.params.id, {
    title,
    subTitle,
    article,
    imageLanding,
    images,
    externalData,
    mainTag,
    tags,
    category
  });
  if (!newArticle) {
    return res.status(400).json({
      status: res.statusCode,
      message: 'Error updating article'
    });
  }
  res.status(200).json({
    status: res.statusCode,
    message: 'Article updated',
    data: newArticle
  });
});
exports.updateArticle = updateArticle;
const deleteArticle = (0, _middlewares.catchAsync)(async (req, res) => {
  const article = await _models.Article.findByIdAndDelete(req.params.id);
  if (!article) {
    return res.status(400).json({
      status: res.statusCode,
      message: 'Error deleting article'
    });
  }
  res.status(200).json({
    status: res.statusCode,
    message: 'Article deleted',
    data: article
  });
});
exports.deleteArticle = deleteArticle;
const getArticle = (0, _middlewares.catchAsync)(async (req, res) => {
  const article = await _models.Article.findById(req.params.id).populate('views mainTag tags category analysis author');
  if (!article) {
    return res.status(400).json({
      status: res.statusCode,
      message: 'Error getting article'
    });
  }
  res.status(200).json({
    status: res.statusCode,
    message: 'Article found',
    data: article
  });
});
exports.getArticle = getArticle;
const getArticles = (0, _middlewares.catchAsync)(async (req, res) => {
  const {
    page = 1,
    limit = 10
  } = req.query;
  const productsLength = await _models.Article.countDocuments();
  const articles = await _models.Article.find().populate('views mainTag tags category analysis author').limit(limit).skip((page - 1) * limit);
  if (articles === null) {
    return res.status(400).json({
      status: res.statusCode,
      message: 'Error getting articles'
    });
  }
  const articlesResponse = {
    totalPages: Math.ceil(productsLength / limit),
    currentPage: page,
    hasNextPage: page < Math.ceil(productsLength / limit),
    hasPreviousPage: page > 1,
    data: articles
  };
  res.status(200).json({
    status: res.statusCode,
    message: 'Articles obtained',
    data: articlesResponse
  });
});
exports.getArticles = getArticles;
const getArticlesByLatest = (0, _middlewares.catchAsync)(async (req, res) => {
  const {
    id
  } = req.params;
  const {
    page = 1,
    limit = 10
  } = req.query;
  const articlesByCategory = await _models.Article.find({
    category: id
  }).sort({
    date: -1
  }).populate('views mainTag tags analysis author').limit(limit).skip((page - 1) * limit);
  if (articlesByCategory === null) {
    return res.status(400).json({
      status: res.statusCode,
      message: 'Error getting articles'
    });
  }
  const productsLength = articlesByCategory.length;
  const articlesResponse = {
    totalPages: Math.ceil(productsLength / limit),
    currentPage: page,
    hasNextPage: page < Math.ceil(productsLength / limit),
    hasPreviousPage: page > 1,
    data: articlesByCategory
  };
  res.status(200).json({
    status: res.statusCode,
    message: 'Articles obtained',
    data: articlesResponse
  });
});
exports.getArticlesByLatest = getArticlesByLatest;
const getArticlesByMostViewed = (0, _middlewares.catchAsync)(async (req, res) => {
  const {
    id
  } = req.params;
  const {
    page = 1,
    limit = 10
  } = req.query;
  const articlesByCategory = await _models.Article.find({
    category: id
  }).sort({
    views: -1
  }).populate('views mainTag tags analysis author').limit(limit).skip((page - 1) * limit);
  if (articlesByCategory === null) {
    return res.status(400).json({
      status: res.statusCode,
      message: 'Error getting articles'
    });
  }
  const productsLength = articlesByCategory.length;
  const articlesResponse = {
    totalPages: Math.ceil(productsLength / limit),
    currentPage: page,
    hasNextPage: page < Math.ceil(productsLength / limit),
    hasPreviousPage: page > 1,
    data: articlesByCategory
  };
  res.status(200).json({
    status: res.statusCode,
    message: 'Articles obtained',
    data: articlesResponse
  });
});
exports.getArticlesByMostViewed = getArticlesByMostViewed;
const getArticlesByTag = (0, _middlewares.catchAsync)(async (req, res) => {
  const {
    id
  } = req.params;
  const {
    page = 1,
    limit = 10
  } = req.query;
  const productsLength = await _models.Article.countDocuments();
  const articles = await _models.Article.findById({
    tags: id
  }).populate('views mainTag tags analysis category author').limit(limit).skip((page - 1) * limit);
  if (!articles) {
    return res.status(400).json({
      status: res.statusCode,
      message: 'Tag not found'
    });
  }
  const articlesResponse = {
    totalPages: Math.ceil(productsLength / limit),
    currentPage: page,
    hasNextPage: page < Math.ceil(productsLength / limit),
    hasPreviousPage: page > 1,
    data: articles
  };
  res.status(200).json({
    status: res.statusCode,
    message: 'Articles found',
    data: articlesResponse
  });
});
exports.getArticlesByTag = getArticlesByTag;