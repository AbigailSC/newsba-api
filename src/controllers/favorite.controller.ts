import { RequestHandler } from 'express';
import { ObjectId } from 'mongoose';
import { catchAsync } from '@middlewares';
import { Favorite } from '@models';

export const getFavoritesByUser: RequestHandler = catchAsync(
  async (req, res) => {
    const id: ObjectId = req.body.userConfirm._id;

    const favorites = await Favorite.findById(id).populate('favorites');

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
  }
);

export const addFavorite: RequestHandler = catchAsync(async (req, res) => {
  const id: ObjectId = req.body.userConfirm._id;
  const { articleId } = req.body;
  const favorites = await Favorite.findById(id);

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

export const deleteFavorite: RequestHandler = catchAsync(async (req, res) => {
  const id: ObjectId = req.body.userConfirm._id;
  const { articleId } = req.body;
  const favorites = await Favorite.findById(id);

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
