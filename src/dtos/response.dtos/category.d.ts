import { Document } from 'mongoose';

interface ICategory extends Document {
  id: string;
  name: string;
  createdBy: string;
  updatedBy: string;
}
