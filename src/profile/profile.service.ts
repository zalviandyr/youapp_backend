import { Injectable } from '@nestjs/common';

@Injectable()
export class ProfileService {
  getProfile(): string {
    return 'Profile';
  }

  createProfile(): string {
    return 'Create Profile';
  }

  updateProfile(): string {
    return 'Update Profile';
  }
}
