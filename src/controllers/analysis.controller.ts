import { AnalysisType, QueryType } from '@interfaces';
import { catchAsync } from '@middlewares';
import { Analysis, Article } from '@models';
import { RequestHandler } from 'express';

export const createAnalysis: RequestHandler = catchAsync(async (req, res) => {
  const { title, image, average, pros, resume, articleId }: AnalysisType =
    req.body;
  const analysis = new Analysis({
    title,
    image,
    average,
    pros,
    resume,
    articleId,
    authorId: req.body.userConfirm._id
  });

  if (!analysis) {
    return res.status(400).json({
      status: res.statusCode,
      message: 'Error creating analysis'
    });
  }
  const analysisExists = await Analysis.findOne({ articleId });

  if (analysisExists) {
    return res.status(400).json({
      status: res.statusCode,
      message: 'Analysis already exists'
    });
  }
  await analysis.save();
  const articleModified = await Article.findOneAndUpdate(
    { _id: articleId },
    {
      analysis: analysis._id
    }
  );
  console.log(
    '🚀 ~ file: analysis.controller.ts:40 ~ constcreateAnalysis:RequestHandler=catchAsync ~ articleModified:',
    articleModified
  );

  res.status(200).json({
    status: res.statusCode,
    message: 'Analysis created',
    data: articleModified
  });
});

export const updateAnalysis: RequestHandler = catchAsync(async (req, res) => {
  const { title, image, average, pros, resume }: AnalysisType = req.body;
  const { id } = req.params;
  const analysisModified = await Analysis.findOneAndUpdate(
    { _id: id },
    {
      title,
      image,
      average,
      pros,
      resume
    }
  );
  if (!analysisModified) {
    return res.status(400).json({
      status: res.statusCode,
      message: 'Error updating analysis'
    });
  }
  res.status(200).json({
    status: res.statusCode,
    message: 'Analysis updated',
    data: analysisModified
  });
});

export const deleteAnalysis: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const analysisDeleted = await Analysis.findByIdAndDelete(id);
  if (!analysisDeleted) {
    return res.status(400).json({
      status: res.statusCode,
      message: 'Error deleting analysis'
    });
  }
  await Article.findOneAndUpdate(
    { analysis: id },
    {
      analysis: null
    }
  );
  res.status(200).json({
    status: res.statusCode,
    message: 'Analysis deleted',
    data: analysisDeleted
  });
});

export const getAnalysisById: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const analysis = await Analysis.findById(id);
  if (!analysis) {
    return res.status(400).json({
      status: res.statusCode,
      message: 'Error getting analysis'
    });
  }
  res.status(200).json({
    status: res.statusCode,
    message: 'Analysis found',
    data: analysis
  });
});

export const getAnalysisByCategory: RequestHandler = catchAsync(
  async (req, res) => {
    const { page = 1, limit = 10 } = req.query as QueryType;

    const analysisByCategory = await Article.find({ analysis: { $ne: null } })
      .sort({ createdAt: -1 })
      .populate('views mainTag tags analysis author')
      .limit(limit)
      .skip((page - 1) * limit);

    if (analysisByCategory === null) {
      return res.status(400).json({
        status: res.statusCode,
        message: 'Error getting analysis'
      });
    }

    const analysisLength = analysisByCategory.length;

    const analysisResponse = {
      totalPages: Math.ceil(analysisLength / limit),
      currentPage: page,
      hasNextPage: page < Math.ceil(analysisLength / limit),
      hasPreviousPage: page > 1,
      data: analysisByCategory
    };

    res.status(200).json({
      status: res.statusCode,
      message: 'Analysis obtained',
      data: analysisResponse
    });
  }
);
