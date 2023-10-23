import { Schema, model, Model } from 'mongoose';
import { ViewType } from '@interfaces';

const ViewSchema = new Schema<ViewType>(
  {
    articleId: {
      type: Schema.Types.ObjectId,
      ref: 'Article',
      required: true
    },
    views: {
      type: Number,
      required: false,
      default: 0
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

ViewSchema.methods.toJSON = function () {
  const { _v, _id, createdAt, updatedAt, ...view } = this.toObject();
  return view;
};

const View: Model<ViewType> = model<ViewType>('View', ViewSchema);

export default View;
