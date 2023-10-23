import { ObjectId } from 'mongoose';

export interface ViewType {
  article: ObjectId;
  views: number;
}
