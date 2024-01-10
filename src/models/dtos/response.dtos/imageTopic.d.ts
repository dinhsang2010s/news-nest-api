import { Document } from 'mongoose';

interface IImageTopic extends Document {
  id: string;
  articleId: string;
  url: string;
}
