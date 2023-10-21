import { Schema, model, Model } from 'mongoose';
import { CategoryType } from '@interfaces';

const CategorySchema = new Schema<CategoryType>(
  {
    name: {
      type: String,
      required: true,
      unique: true
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

CategorySchema.methods.toJSON = function () {
  const { _v, _id, createdAt, updatedAt, ...category } = this.toObject();
  return category;
};

const Category: Model<CategoryType> = model<CategoryType>(
  'Category',
  CategorySchema
);

export default Category;
