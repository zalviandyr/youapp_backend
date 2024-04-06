import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register() {
    return this.authService.register();
  }

  @Post('login')
  login() {
    return this.authService.login();
  }
}
