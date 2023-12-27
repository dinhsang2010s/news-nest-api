import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false })
export class Post {
  @Prop({ index: true, required: true }) title: string;
  @Prop() description: string;
  @Prop() content: string;
  @Prop() status: number;
  @Prop({ index: true, required: true }) categoryId: string;
  @Prop() imageTopic: string;
  @Prop() keyWordSeo: string;
  @Prop() descriptionSeo: string;
  @Prop() createdBy: string;
  @Prop() updatedBy: string;
  @Prop() createdAt: Date;
  @Prop() updatedAt: Date;
}

export const PostSchema = SchemaFactory.createForClass(Post);
