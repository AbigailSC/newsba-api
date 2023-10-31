"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _mongoose = require("mongoose");
const CategorySchema = new _mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  }
}, {
  timestamps: true,
  versionKey: false
});
CategorySchema.methods.toJSON = function () {
  const {
    _v,
    _id,
    createdAt,
    updatedAt,
    ...category
  } = this.toObject();
  return category;
};
const Category = (0, _mongoose.model)('Category', CategorySchema);
var _default = Category;
exports.default = _default;