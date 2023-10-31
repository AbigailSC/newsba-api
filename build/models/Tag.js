"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _mongoose = require("mongoose");
const TagSchema = new _mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  }
}, {
  timestamps: true,
  versionKey: false
});
TagSchema.methods.toJSON = function () {
  const {
    _v,
    _id,
    createdAt,
    updatedAt,
    ...tag
  } = this.toObject();
  return tag;
};
const Tag = (0, _mongoose.model)('Tag', TagSchema);
var _default = Tag;
exports.default = _default;