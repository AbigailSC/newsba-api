"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFavoritesByUser = exports.deleteFavorite = exports.addFavorite = void 0;
var _middlewares = require("../middlewares");
var _models = require("../models");
const getFavoritesByUser = (0, _middlewares.catchAsync)(async (req, res) => {
  const id = req.body.userConfirm._id;
  const favorites = await _models.Favorite.findById(id).populate('favorites');
  if (!favorites) {
    return res.status(400).json({
      status: res.statusCode,
      message: 'Error getting favorites'
    });
  }
  res.status(200).json({
    status: res.statusCode,
    message: 'Favorites obtained',
    data: favorites
  });
});
exports.getFavoritesByUser = getFavoritesByUser;
const addFavorite = (0, _middlewares.catchAsync)(async (req, res) => {
  const id = req.body.userConfirm._id;
  const {
    articleId
  } = req.body;
  const favorites = await _models.Favorite.findById(id);
  if (!favorites) {
    return res.status(400).json({
      status: res.statusCode,
      message: 'Error adding favorite'
    });
  }
  favorites.favorites.push(articleId);
  await favorites.save();
  res.status(200).json({
    status: res.statusCode,
    message: 'Favorite added',
    data: favorites
  });
});
exports.addFavorite = addFavorite;
const deleteFavorite = (0, _middlewares.catchAsync)(async (req, res) => {
  const id = req.body.userConfirm._id;
  const {
    articleId
  } = req.body;
  const favorites = await _models.Favorite.findById(id);
  if (!favorites) {
    return res.status(400).json({
      status: res.statusCode,
      message: 'Error deleting favorite'
    });
  }
  const index = favorites.favorites.indexOf(articleId);
  favorites.favorites.splice(index, 1);
  await favorites.save();
  res.status(200).json({
    status: res.statusCode,
    message: 'Favorite deleted',
    data: favorites
  });
});
exports.deleteFavorite = deleteFavorite;