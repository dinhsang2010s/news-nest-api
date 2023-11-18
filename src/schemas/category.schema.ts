import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Category {
  @Prop({ unique: [true, 'Category already exists!'] }) name: string;
  @Prop() status: number;
  @Prop() createdBy: string;
  @Prop() updatedBy: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
