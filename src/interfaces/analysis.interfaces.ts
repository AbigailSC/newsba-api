import { ObjectId } from 'mongoose';

export interface AnalysisType {
  title: string;
  image: string;
  average: number;
  pros: string[];
  resume: string;
  authorId: ObjectId;
  articleId: ObjectId;
}
