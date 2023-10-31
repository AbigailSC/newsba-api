"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _mongoose = require("mongoose");
const FavoriteSchema = new _mongoose.Schema({
  userId: {
    type: _mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  favorites: [{
    type: _mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Article'
  }]
}, {
  timestamps: true,
  versionKey: false
});
FavoriteSchema.methods.toJSON = function () {
  const {
    _v,
    _id,
    createdAt,
    updatedAt,
    ...favorite
  } = this.toObject();
  return favorite;
};
const Favorite = (0, _mongoose.model)('Favorite', FavoriteSchema);
var _default = Favorite;
exports.default = _default;