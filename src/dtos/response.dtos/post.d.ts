import { Document } from 'mongoose';

interface IPost extends Document {
  id: string;
  title: string;
  description: string;
  status: number;
  content: string;
  categoryId: string;
  imageTopic: string;
  image: string[];
  link: string[];
  tagSearchIds: string[];
  keyWordSeo: string;
  descriptionSeo: string;
  createdBy: string;
  updatedBy: string;
}
