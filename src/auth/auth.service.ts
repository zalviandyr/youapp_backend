import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userSchema: Model<User>,
    private jwtService: JwtService,
  ) {}

  async register(data: RegisterDto): Promise<User> {
    data.password = await this.hashPassword(data.password);

    return await this.userSchema.create(data);
  }

  async login({
    username,
    password,
  }: LoginDto): Promise<{ access_token: string } | User> {
    const user = await this.userSchema.findOne({
      $or: [{ email: username }, { username }],
    });
    const isValid = this.validatePassword(password, user?.password);

    if (!isValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user._id, username };
    const token = await this.jwtService.signAsync(payload);

    return {
      access_token: token,
      ...user.toJSON(),
    };
  }

  private async hashPassword(value: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(value, salt);

    return hash;
  }

  private validatePassword(value: string, hashedValue?: string): boolean {
    if (!hashedValue) return false;

    return bcrypt.compareSync(value, hashedValue);
  }
}
