import { ObjectId } from 'mongoose';

export interface ArticleType {
  slug: string;
  title: string;
  subTitle: string;
  article: string[];
  imageLanding: string;
  date: Date;
  views: number;
  images: string[] | [];
  externalData?: string;
  mainTag: ObjectId;
  tags: ObjectId[];
  category: string;
  analysis?: ObjectId;
}
