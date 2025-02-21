import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  dob: Date;

  @Prop()
  country: string;

  @Prop()
  profilePic: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
