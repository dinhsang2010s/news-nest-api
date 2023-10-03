import { Document } from 'mongoose';

interface ICategory extends Document {
  name: string;
  description: string;
}
