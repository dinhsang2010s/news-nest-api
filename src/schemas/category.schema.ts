import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true, versionKey: false })
export class Category {
  @Prop({ unique: [true, 'Category already exists!'] }) name: string;
  @Prop() status: boolean = false;
  @Prop() createdBy: string;
  @Prop() updatedBy: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
