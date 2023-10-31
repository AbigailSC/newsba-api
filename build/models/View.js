"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _mongoose = require("mongoose");
const ViewSchema = new _mongoose.Schema({
  articleId: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'Article',
    required: true
  },
  views: {
    type: Number,
    required: false,
    default: 0
  }
}, {
  timestamps: true,
  versionKey: false
});
ViewSchema.methods.toJSON = function () {
  const {
    _v,
    _id,
    createdAt,
    updatedAt,
    ...view
  } = this.toObject();
  return view;
};
const View = (0, _mongoose.model)('View', ViewSchema);
var _default = View;
exports.default = _default;