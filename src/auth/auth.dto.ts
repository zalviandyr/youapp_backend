import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
import { Match } from 'src/common/decorator/match.decorator';

export class RegisterDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  @Length(6, 15)
  password: string;

  @IsNotEmpty()
  @IsString()
  @Length(6, 15)
  @Match('password')
  confirmPassword: string;
}

export class LoginDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
