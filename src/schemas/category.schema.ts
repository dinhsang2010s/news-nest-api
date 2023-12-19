import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true, versionKey: false, validateBeforeSave: true })
export class Category {
  @Prop({ unique: true, index: true }) name: string;
  @Prop() createdBy: string;
  @Prop() updatedBy: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
