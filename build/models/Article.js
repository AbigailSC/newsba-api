"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _mongoose = require("mongoose");
const ArticleSchema = new _mongoose.Schema({
  slug: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  subTitle: {
    type: String,
    required: [true, 'SubTitle is required'],
    trim: true
  },
  article: [{
    type: String,
    required: [true, 'Article is required'],
    trim: true
  }],
  imageLanding: {
    type: String,
    required: [true, 'Image Landing is required'],
    trim: true
  },
  date: {
    type: Date,
    required: [true, 'Date is required']
  },
  views: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'View'
  },
  images: [{
    type: String,
    required: [true, 'Images is required'],
    trim: true
  }],
  externalData: {
    type: String,
    required: false,
    trim: true
  },
  mainTag: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'Tag'
  },
  tags: [{
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'Tag'
  }],
  category: {
    type: _mongoose.Schema.Types.ObjectId,
    required: [true, 'Category is required'],
    ref: 'Category'
  },
  analysis: {
    type: _mongoose.Schema.Types.ObjectId,
    required: false,
    default: null,
    ref: 'Analysis'
  },
  author: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true,
  versionKey: false
});
ArticleSchema.methods.toJSON = function () {
  const {
    _v,
    _id,
    createdAt,
    updatedAt,
    ...article
  } = this.toObject();
  return article;
};
const Article = (0, _mongoose.model)('Article', ArticleSchema);
var _default = Article;
exports.default = _default;