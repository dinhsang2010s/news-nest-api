import { Document } from 'mongoose';

interface ICategory extends Document {
  name: string;
  createdBy: string;
  updatedBy: string;
}
