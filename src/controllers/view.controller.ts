import { catchAsync } from '@middlewares';
import { RequestHandler } from 'express';
import { View } from '@models';
import { ViewType } from '@interfaces';

export const postView: RequestHandler = catchAsync(async (req, res) => {
  const { articleId }: ViewType = req.body;
  const newView = new View({
    articleId,
    views: 0
  });
  if (!newView) {
    return res.status(400).json({
      status: res.statusCode,
      message: 'Error creating view'
    });
  }
  await newView.save();
  res.status(201).json({
    status: res.statusCode,
    message: 'View created',
    data: newView
  });
});

export const updateArticleViewByCatedoryId: RequestHandler = catchAsync(
  async (req, res) => {
    const { categoryId } = req.params;
    const existsView = await View.findById(categoryId);
    if (!existsView) {
      return res.status(400).json({
        status: res.statusCode,
        message: 'View by category not found'
      });
    }
    const view = await View.findById(categoryId, {
      $inc: {
        seq: 1
      }
    });
    res.status(201).json({
      status: res.statusCode,
      message: 'View by cateogory updated',
      data: view
    });
  }
);
