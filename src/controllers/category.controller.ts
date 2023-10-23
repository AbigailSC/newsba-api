import { catchAsync } from '@middlewares';
import { RequestHandler } from 'express';
import { Category } from '@models';
import { CategoryType } from '@interfaces';

export const postCategory: RequestHandler = catchAsync(async (req, res) => {
  const { name }: CategoryType = req.body;
  const newCategory = new Category({
    name
  });
  if (!newCategory) {
    return res.status(400).json({
      status: res.statusCode,
      message: 'Error creating category'
    });
  }
  await newCategory.save();
  res.status(201).json({
    status: res.statusCode,
    message: 'Category created',
    data: newCategory
  });
});

export const updateCategory: RequestHandler = catchAsync(async (req, res) => {
  const { name }: CategoryType = req.body;
  const { id } = req.params;
  const existsCategory = await Category.findById(id);
  if (!existsCategory) {
    return res.status(400).json({
      status: res.statusCode,
      message: 'Category not found'
    });
  }
  const category = await Category.findByIdAndUpdate(id, {
    name
  });
  res.status(201).json({
    status: res.statusCode,
    message: 'Category updated',
    data: category
  });
});

export const getCategoryById: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const category = await Category.findById(id);
  if (!category) {
    return res.status(400).json({
      status: res.statusCode,
      message: 'Category not found'
    });
  }
  res.status(200).json({
    status: res.statusCode,
    message: 'Category found',
    data: category
  });
});

export const getAllCategories: RequestHandler = catchAsync(
  async (_req, res) => {
    const category = await Category.find();
    if (category.length < 1) {
      return res.status(204).json({
        status: res.statusCode,
        message: 'No content'
      });
    }
    res.status(200).json({
      status: res.statusCode,
      message: 'All categories',
      data: category
    });
  }
);

export const deleteCategoryById: RequestHandler = catchAsync(
  async (req, res) => {
    const { id } = req.params;
    const category = await Category.findByIdAndDelete(id);
    if (!category) {
      return res.status(400).json({
        status: res.statusCode,
        message: 'Category not found'
      });
    }
    res.status(200).json({
      status: res.statusCode,
      message: 'Category deleted',
      data: category
    });
  }
);
