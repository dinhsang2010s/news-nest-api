import { Document } from 'mongoose';

interface IPost extends Document {
  id: string;
  title: string;
  description: string;
  status: number;
  content: string;
  imageTopic: string;
  categoryId: string;
  categoryName: string;
  keyWordSeo: string;
  descriptionSeo: string;
  createdBy: string;
  updatedBy: string;
}
