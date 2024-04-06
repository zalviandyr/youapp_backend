import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Profile } from './schemas/profile.schema';
import { Model } from 'mongoose';
import { ProfileDto } from './dto/profile.dto';
import { horoscopeConstant, zodiacConstant } from 'src/app/constants';
import moment from 'moment';

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
      horoscope: this.getHoroscope(data.birthDate),
      zodiac: this.getZodiac(data.birthDate),
      profilePicture: data.profilePicture.buffer.toString('base64'),
    });
  }

  async updateProfile(data: ProfileDto, userId: string): Promise<Profile> {
    const profile = await this.profileSchema.findOne({ user: userId });

    return profile
      .set({
        ...data,
        horoscope: this.getHoroscope(data.birthDate),
        zodiac: this.getZodiac(data.birthDate),
        profilePicture: data.profilePicture.buffer.toString('base64'),
      })
      .save();
  }

  async getProfile(userId: string): Promise<string> {
    return await this.profileSchema.findOne({ user: userId });
  }

  private getZodiac(birthDate: string): string {
    const date = moment(birthDate);

    for (const zodiac of zodiacConstant) {
      const start = moment(zodiac[0]);
      const end = moment(zodiac[1]);

      if (date.isBetween(start, end)) {
        return zodiac[2];
      }
    }

    throw new Error('Invalid birth date');
  }

  private getHoroscope(birthDate: string): string {
    const date = moment(birthDate).year(2000);

    for (const horoscope of horoscopeConstant) {
      const start = moment(horoscope[1]).year(2000);
      const end = moment(horoscope[2]).year(2000);

      console.log({ start, end, date });

      if (date.isBetween(start, end, 'm')) {
        return horoscope[0];
      }
    }

    throw new Error('Invalid birth date');
  }
}
