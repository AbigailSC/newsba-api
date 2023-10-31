import { catchAsync } from '@middlewares';
import { RequestHandler } from 'express';
import { Article, Tag } from '@models';
import { TagType } from '@interfaces';

export const postTag: RequestHandler = catchAsync(async (req, res) => {
  const { name }: TagType = req.body;
  const newTag = new Tag({
    name
  });
  if (!newTag) {
    return res.status(400).json({
      status: res.statusCode,
      message: 'Error creating tag'
    });
  }
  const tagExists = await Tag.findOne({ name });
  if (tagExists) {
    return res.status(400).json({
      status: res.statusCode,
      message: 'Tag already exists'
    });
  }
  await newTag.save();
  res.status(201).json({
    status: res.statusCode,
    message: 'Tag created',
    data: newTag
  });
});

export const updateTag: RequestHandler = catchAsync(async (req, res) => {
  const { name }: TagType = req.body;
  const { id } = req.params;
  const existsTag = await Tag.findById(id);
  if (!existsTag) {
    return res.status(400).json({
      status: res.statusCode,
      message: 'Tag not found'
    });
  }
  const tag = await Tag.findByIdAndUpdate(id, {
    name
  });
  res.status(201).json({
    status: res.statusCode,
    message: 'Tag updated',
    data: tag
  });
});

export const getTagById: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const tag = await Tag.findById(id);
  if (!tag) {
    return res.status(400).json({
      status: res.statusCode,
      message: 'Tag not found'
    });
  }
  res.status(200).json({
    status: res.statusCode,
    message: 'Tag found',
    data: tag
  });
});

export const getAllTags: RequestHandler = catchAsync(async (_req, res) => {
  const tag = await Tag.find();
  if (tag.length < 1) {
    return res.status(204).json({
      status: res.statusCode,
      message: 'No content'
    });
  }
  res.status(200).json({
    status: res.statusCode,
    message: 'All tags',
    data: tag
  });
});

export const deleteTagById: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const tag = await Tag.findByIdAndDelete(id);
  if (!tag) {
    return res.status(400).json({
      status: res.statusCode,
      message: 'Tag not found'
    });
  }
  res.status(200).json({
    status: res.statusCode,
    message: 'Tag deleted',
    data: tag
  });
});
