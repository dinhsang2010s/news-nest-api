import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true, versionKey: false })
export class Post {
  @Prop() title: string;
  @Prop() description: string;
  @Prop() content: string;
  @Prop() status: number;
  // @Prop() ownerId: string;
  @Prop() categoryId: string;
  @Prop() imageTopic: string;
  @Prop([String]) image: string[];
  @Prop([String]) link: string[];
  @Prop([String]) tagSearchIds: string[];
  @Prop() keyWordSeo: string;
  @Prop() descriptionSeo: string;
  @Prop() createdBy: string;
  @Prop() updatedBy: string;
}

export const PostSchema = SchemaFactory.createForClass(Post);
