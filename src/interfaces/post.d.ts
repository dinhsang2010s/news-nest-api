import { Document } from 'mongoose';

interface Post extends Document {
  title: string;
  description: string;
  content: string;
  status: boolean;
  ownerId: string;
  categoryId: string;
  image: string[];
  link: string[];
  tagSearchIds: string[];
  keyWordSeo: string;
  descriptionSeo: string;
}
