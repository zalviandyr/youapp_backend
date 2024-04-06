import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './auth.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() data: RegisterDto) {
    console.log(data);

    return this.authService.register();
  }

  @Post('login')
  login(@Body() data: LoginDto) {
    console.log(data);

    return this.authService.login();
  }
}
