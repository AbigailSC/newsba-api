import { ObjectId } from 'mongoose';

export interface ViewType {
  articleId: ObjectId;
  views: number;
}
