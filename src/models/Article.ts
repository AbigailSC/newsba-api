import { Schema, model, Model } from 'mongoose';
import { ArticleType } from '@interfaces';

const ArticleSchema = new Schema<ArticleType>(
  {
    slug: {
      type: String,
      required: true,
      unique: true
    },
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true
    },
    subTitle: {
      type: String,
      required: [true, 'SubTitle is required'],
      trim: true
    },
    article: [
      {
        type: String,
        required: [true, 'Article is required'],
        trim: true
      }
    ],
    imageLanding: {
      type: String,
      required: [true, 'Image Landing is required'],
      trim: true
    },
    date: {
      type: Date,
      required: [true, 'Date is required']
    },
    views: {
      type: Number,
      required: [true, 'Views is required']
    },
    images: [
      {
        type: String,
        required: [true, 'Images is required'],
        trim: true
      }
    ],
    externalData: {
      type: String,
      required: false,
      trim: true
    },
    mainTag: {
      type: Schema.Types.ObjectId,
      ref: 'Tag'
    },
    tags: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Tag'
      }
    ],
    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true
    },
    analysis: {
      type: Schema.Types.ObjectId,
      ref: 'Analysis'
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

ArticleSchema.methods.toJSON = function () {
  const { _v, _id, createdAt, updatedAt, ...article } = this.toObject();
  return article;
};

const Article: Model<ArticleType> = model<ArticleType>(
  'Article',
  ArticleSchema
);

export default Article;
