import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Post {
  @Prop() title: string;
  @Prop() description: string;
  @Prop() content: string;
  @Prop() status: boolean = false;
  @Prop() ownerId: string;
  @Prop() categoryId: string;
  @Prop([String]) image: string[];
  @Prop([String]) link: string[];
  @Prop([String]) tagSearchIds: string[];
  @Prop() keyWordSeo: string;
  @Prop() descriptionSeo: string;
}

export const PostSchema = SchemaFactory.createForClass(Post);
