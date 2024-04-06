import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileDto } from './dto/profile.dto';
import { FormDataRequest } from 'nestjs-form-data';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller()
@UseGuards(AuthGuard)
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post('createProfile')
  @FormDataRequest()
  createProfile(@Request() req, @Body() data: ProfileDto) {
    const user = req.user;
    return this.profileService.createProfile(data, user);
  }

  @Post('updateProfile')
  @FormDataRequest()
  updateProfile(@Request() req, @Body() data: ProfileDto) {
    const user = req.user;
    return this.profileService.updateProfile(data, user);
  }

  @Get('getProfile')
  getProfile(@Request() req) {
    const user = req.user;
    return this.profileService.getProfile(user);
  }
}
