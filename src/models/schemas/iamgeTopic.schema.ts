import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false })
export class ImageTopic {
  @Prop({ index: true, required: true }) articleId: string;
  @Prop() url: string;
}

export const ImageTopicSchema = SchemaFactory.createForClass(ImageTopic);
