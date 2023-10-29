import { ArticleType, QueryType } from '@interfaces';
import { catchAsync } from '@middlewares';
import { RequestHandler } from 'express';
import { Article, View } from '@models';
import { generateSlug } from '@utils';

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

  const slug: string = generateSlug(title);

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

  const view = new View({ views: 0, articleId: newArticle._id });
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
    message: 'Article created'
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

export const deleteArticle: RequestHandler = catchAsync(async (req, res) => {
  const article = await Article.findByIdAndDelete(req.params.id);

  if (!article) {
    return res.status(400).json({
      status: res.statusCode,
      message: 'Error deleting article'
    });
  }

  res.status(200).json({
    status: res.statusCode,
    message: 'Article deleted',
    data: article
  });
});

export const getArticle: RequestHandler = catchAsync(async (req, res) => {
  const article = await Article.findById(req.params.id).populate(
    'views mainTag tags category analysis author'
  );

  if (!article) {
    return res.status(400).json({
      status: res.statusCode,
      message: 'Error getting article'
    });
  }

  res.status(200).json({
    status: res.statusCode,
    message: 'Article found',
    data: article
  });
});

export const getArticles: RequestHandler = catchAsync(async (req, res) => {
  const { page = 1, limit = 10 } = req.query as QueryType;
  const productsLength = await Article.countDocuments();

  const articles = await Article.find()
    .populate('views mainTag tags category analysis author')
    .limit(limit)
    .skip((page - 1) * limit);
  if (articles === null) {
    return res.status(400).json({
      status: res.statusCode,
      message: 'Error getting articles'
    });
  }
  const articlesResponse = {
    totalPages: Math.ceil(productsLength / limit),
    currentPage: page,
    hasNextPage: page < Math.ceil(productsLength / limit),
    hasPreviousPage: page > 1,
    articles
  };

  res.status(200).json({
    status: res.statusCode,
    message: 'Articles obtained',
    data: articlesResponse
  });
});
