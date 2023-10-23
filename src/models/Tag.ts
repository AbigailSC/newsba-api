import { Schema, model, Model } from 'mongoose';
import { TagType } from '@interfaces';

const TagSchema = new Schema<TagType>(
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

TagSchema.methods.toJSON = function () {
  const { _v, _id, createdAt, updatedAt, ...tag } = this.toObject();
  return tag;
};

const Tag: Model<TagType> = model<TagType>('Tag', TagSchema);

export default Tag;
