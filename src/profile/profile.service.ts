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
    const result = (
      await this.profileSchema.create({
        ...data,
        user: userId,
        horoscope: 'xx',
        zodiac: 'xxx',
        profilePicture: data.profilePicture.buffer.toString('base64'),
      })
    ).toJSON();

    delete result.profilePicture;

    return result;
  }

  getProfile(): string {
    return 'Create Profile';
  }

  updateProfile(): string {
    return 'Update Profile';
  }
}
