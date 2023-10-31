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
    category
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
    author: req.body.userConfirm._id
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
    data: articles
  };

  res.status(200).json({
    status: res.statusCode,
    message: 'Articles obtained',
    data: articlesResponse
  });
});

export const getArticlesByLatest = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { page = 1, limit = 10 } = req.query as QueryType;

  const articlesByCategory = await Article.find({ category: id })
    .sort({ date: -1 })
    .populate('views mainTag tags analysis author')
    .limit(limit)
    .skip((page - 1) * limit);
  if (articlesByCategory === null) {
    return res.status(400).json({
      status: res.statusCode,
      message: 'Error getting articles'
    });
  }
  const productsLength = articlesByCategory.length;

  const articlesResponse = {
    totalPages: Math.ceil(productsLength / limit),
    currentPage: page,
    hasNextPage: page < Math.ceil(productsLength / limit),
    hasPreviousPage: page > 1,
    data: articlesByCategory
  };

  res.status(200).json({
    status: res.statusCode,
    message: 'Articles obtained',
    data: articlesResponse
  });
});

export const getArticlesByMostViewed = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { page = 1, limit = 10 } = req.query as QueryType;

  const articlesByCategory = await Article.find({ category: id })
    .sort({ views: -1 })
    .populate('views mainTag tags analysis author')
    .limit(limit)
    .skip((page - 1) * limit);
  if (articlesByCategory === null) {
    return res.status(400).json({
      status: res.statusCode,
      message: 'Error getting articles'
    });
  }

  const productsLength = articlesByCategory.length;

  const articlesResponse = {
    totalPages: Math.ceil(productsLength / limit),
    currentPage: page,
    hasNextPage: page < Math.ceil(productsLength / limit),
    hasPreviousPage: page > 1,
    data: articlesByCategory
  };

  res.status(200).json({
    status: res.statusCode,
    message: 'Articles obtained',
    data: articlesResponse
  });
});

export const getArticlesByTag: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { page = 1, limit = 10 } = req.query as QueryType;
  const productsLength = await Article.countDocuments();

  const articles: ArticleType | null = await Article.findById({ tags: id })
    .populate('views mainTag tags analysis category author')
    .limit(limit)
    .skip((page - 1) * limit);
  if (!articles) {
    return res.status(400).json({
      status: res.statusCode,
      message: 'Tag not found'
    });
  }

  const articlesResponse = {
    totalPages: Math.ceil(productsLength / limit),
    currentPage: page,
    hasNextPage: page < Math.ceil(productsLength / limit),
    hasPreviousPage: page > 1,
    data: articles
  };

  res.status(200).json({
    status: res.statusCode,
    message: 'Articles found',
    data: articlesResponse
  });
});

export const searchArticles: RequestHandler = catchAsync(async (req, res) => {
  const { page = 1, limit = 10 } = req.query as QueryType;
  const { name } = req.query;
  const productsLength = await Article.countDocuments();

  const articles = await Article.find({
    title: { $regex: name, $options: 'i' }
  })
    .populate('views mainTag tags analysis category author')
    .limit(limit)
    .skip((page - 1) * limit);
  if (!articles) {
    return res.status(400).json({
      status: res.statusCode,
      message: 'Aritcles not found'
    });
  }

  const articlesResponse = {
    totalPages: Math.ceil(productsLength / limit),
    currentPage: page,
    hasNextPage: page < Math.ceil(productsLength / limit),
    hasPreviousPage: page > 1,
    data: articles
  };

  res.status(200).json({
    status: res.statusCode,
    message: 'Articles found',
    data: articlesResponse
  });
});
