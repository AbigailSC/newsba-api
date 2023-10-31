"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _mongoose = require("mongoose");
const AnalysisSchema = new _mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  average: {
    type: Number,
    min: 1,
    max: 10,
    required: true
  },
  pros: [{
    type: String,
    required: true
  }],
  resume: {
    type: String,
    required: true
  },
  articleId: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'Article',
    required: true
  },
  authorId: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true,
  versionKey: false
});
AnalysisSchema.methods.toJSON = function () {
  const {
    _v,
    _id,
    createdAt,
    updatedAt,
    ...analysis
  } = this.toObject();
  return analysis;
};
const Analysis = (0, _mongoose.model)('Analysis', AnalysisSchema);
var _default = Analysis;
exports.default = _default;