import { Document } from 'mongoose';

interface IUser extends Document {
  name: string;
  password: string;
}
