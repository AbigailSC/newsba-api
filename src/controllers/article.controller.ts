import { ArticleType } from '@interfaces';
import { catchAsync } from '@middlewares';
import { RequestHandler } from 'express';
import { Article } from '@models';

export const postArticle: RequestHandler = catchAsync(async (req, res) => {
  // ? generate slug with title
  const {
    slug,
    title,
    subTitle,
    article,
    imageLanding,
    date,
    views,
    images,
    externalData,
    mainTag,
    tags,
    category,
    author
  }: ArticleType = req.body;
  const newArticle = await Article.create({
    slug,
    title,
    subTitle,
    article,
    imageLanding,
    date,
    views, // ! Create a model with views and id article
    images,
    externalData,
    mainTag,
    tags,
    category,
    author
  });
  if (!newArticle) {
    return res.status(400).json({
      status: res.statusCode,
      message: 'Error creating article'
    });
  }
  res.status(201).json({
    status: res.statusCode,
    message: 'Article created',
    data: newArticle
  });
});
