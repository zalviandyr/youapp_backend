import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from 'src/auth/schemas/user.schema';

export type ProfileDocument = HydratedDocument<Profile>;

@Schema()
export class Profile {
  @Prop({ required: true })
  displayName: string;

  @Prop({ required: true })
  gender: string;

  @Prop({ required: true })
  birthDate: string;

  @Prop({ required: true })
  horoscope: string;

  @Prop({ required: true })
  zodiac: string;

  @Prop({ required: true })
  height: number;

  @Prop({ required: true })
  weight: number;

  @Prop({ required: true })
  interests: string[];

  @Prop({ required: true })
  profilePicture: string;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
  })
  user: User;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
