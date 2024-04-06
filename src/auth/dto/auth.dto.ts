import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  Validate,
} from 'class-validator';
import { IsUnique } from 'src/app/decorator/is-unique';
import { Match } from 'src/app/decorator/match.decorator';
import { User } from '../schemas/user.schema';

export class RegisterDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @Validate(IsUnique, [User.name])
  email: string;

  @IsNotEmpty()
  @IsString()
  @Validate(IsUnique, [User.name])
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
