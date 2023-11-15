import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true, versionKey: false })
export class User {
  @Prop({ unique: [true, 'User already exists!'] }) name: string;

  @Prop() password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
