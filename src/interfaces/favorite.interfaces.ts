import { ObjectId } from 'mongoose';

export interface FavoriteType {
  userId: ObjectId;
  favorites: ObjectId[];
}
