import { Document } from 'mongoose';

interface ICategory extends Document {
  name: string;
  status: boolean;
  createdBy: string;
  updatedBy: string;
}
