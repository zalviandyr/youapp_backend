import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Profile, ProfileSchema } from './schemas/profile.schema';
import { NestjsFormDataModule } from 'nestjs-form-data';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Profile.name, schema: ProfileSchema }]),
    NestjsFormDataModule,
  ],
  controllers: [ProfileController],
  providers: [ProfileService],
})
export class ProfileModule {}
