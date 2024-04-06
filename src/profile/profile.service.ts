import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Profile } from './schemas/profile.schema';
import { Model } from 'mongoose';
import { ProfileDto } from './dto/profile.dto';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(Profile.name)
    private readonly profileSchema: Model<Profile>,
  ) {}

  async createProfile(data: ProfileDto, userId: string): Promise<Profile> {
    return await this.profileSchema.create({
      ...data,
      user: userId,
      horoscope: 'xx',
      zodiac: 'xxx',
      profilePicture: data.profilePicture.buffer.toString('base64'),
    });
  }

  async updateProfile(data: ProfileDto, userId: string): Promise<Profile> {
    const profile = await this.profileSchema.findOne({ user: userId });

    return profile
      .set({
        ...data,
        profilePicture: data.profilePicture.buffer.toString('base64'),
      })
      .save();
  }

  getProfile(): string {
    return 'Create Profile';
  }
}
