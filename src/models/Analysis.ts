import { Schema, model, Model } from 'mongoose';
import { AnalysisType } from '@interfaces';

const AnalysisSchema = new Schema<AnalysisType>(
  {
    title: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    average: {
      type: Number,
      min: 1,
      max: 10,
      required: true
    },
    pros: [
      {
        type: String,
        required: true
      }
    ],
    resume: {
      type: String,
      required: true
    },
    articleId: {
      type: Schema.Types.ObjectId,
      ref: 'Article',
      required: true
    },
    authorId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

AnalysisSchema.methods.toJSON = function () {
  const { _v, _id, createdAt, updatedAt, ...analysis } = this.toObject();
  return analysis;
};

const Analysis: Model<AnalysisType> = model<AnalysisType>(
  'Analysis',
  AnalysisSchema
);

export default Analysis;
