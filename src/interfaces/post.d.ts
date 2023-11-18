import { Document } from 'mongoose';

interface IPost extends Document {
  id: string;
  title: string;
  description: string;
  content: string;
  //ownerId: string;
  categoryId: string;
  image: string[];
  link: string[];
  tagSearchIds: string[];
  keyWordSeo: string;
  descriptionSeo: string;
  status: number;
  createdBy: string;
  updatedBy: string;
}
