import { Schema, model, Model } from 'mongoose';
import { FavoriteType } from '@interfaces';

const FavoriteSchema = new Schema<FavoriteType>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    favorites: [
      {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Article'
      }
    ]
  },
  {
    timestamps: true,
    versionKey: false
  }
);

FavoriteSchema.methods.toJSON = function () {
  const { _v, _id, createdAt, updatedAt, ...favorite } = this.toObject();
  return favorite;
};

const Favorite: Model<FavoriteType> = model<FavoriteType>(
  'Favorite',
  FavoriteSchema
);

export default Favorite;
