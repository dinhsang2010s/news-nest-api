import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true, versionKey: false })
export class Post {
  @Prop({ index: true }) title: string;
  @Prop() description: string;
  @Prop() content: string;
  @Prop() status: number;
  @Prop() categoryId: string;
  @Prop() imageTopic: string;
  @Prop() image: string;
  @Prop([String]) link: string[];
  @Prop([String]) tagSearchIds: string[];
  @Prop() keyWordSeo: string;
  @Prop() descriptionSeo: string;
  @Prop() createdBy: string;
  @Prop() updatedBy: string;
}

export const PostSchema = SchemaFactory.createForClass(Post);
