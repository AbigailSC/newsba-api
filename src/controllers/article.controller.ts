import { ArticleType } from '@interfaces';
import { catchAsync } from '@middlewares';
import { RequestHandler } from 'express';
import { Article, View } from '@models';

export const postArticle: RequestHandler = catchAsync(async (req, res) => {
  const {
    title,
    subTitle,
    article,
    imageLanding,
    date,
    images,
    externalData,
    mainTag,
    tags,
    category,
    author
  }: ArticleType = req.body;

  const slug = title.replace(/\s+/g, '-').toLowerCase();

  const newArticle = new Article({
    slug,
    title,
    subTitle,
    article,
    imageLanding,
    date,
    images,
    externalData,
    mainTag,
    tags,
    category,
    author
  });

  const view = new View({ views: 0, article: newArticle._id });
  await view.save();
  newArticle.views = view.id;

  if (!newArticle) {
    return res.status(400).json({
      status: res.statusCode,
      message: 'Error creating article'
    });
  }

  await newArticle.save();

  res.status(201).json({
    status: res.statusCode,
    message: 'Article created',
    data: newArticle
  });
});

export const updateArticle: RequestHandler = catchAsync(async (req, res) => {
  const {
    title,
    subTitle,
    article,
    imageLanding,
    images,
    externalData,
    mainTag,
    tags,
    category
  }: ArticleType = req.body;

  const newArticle = await Article.findByIdAndUpdate(req.params.id, {
    title,
    subTitle,
    article,
    imageLanding,
    images,
    externalData,
    mainTag,
    tags,
    category
  });

  if (!newArticle) {
    return res.status(400).json({
      status: res.statusCode,
      message: 'Error updating article'
    });
  }

  res.status(200).json({
    status: res.statusCode,
    message: 'Article updated',
    data: newArticle
  });
});
