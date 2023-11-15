import { Document } from 'mongoose';

interface Post extends Document {
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
  status: boolean;
  createdBy: string;
  updatedBy: string;
}
