import { Controller, Get, Post } from '@nestjs/common';
import { ProfileService } from './profile.service';

@Controller('')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post('createProfile')
  createProfile() {
    return this.profileService.createProfile();
  }

  @Post('updateProfile')
  updateProfile() {
    return this.profileService.updateProfile();
  }

  @Get('getProfile')
  getProfile() {
    return this.profileService.getProfile();
  }
}
