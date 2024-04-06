import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { RegisterDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userSchema: Model<User>,
  ) {}

  async register(data: RegisterDto): Promise<User> {
    data.password = await this.hashPassword(data.password);

    return await this.userSchema.create(data);
  }

  login(): string {
    return 'Login';
  }

  private async hashPassword(value: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(value, salt);

    return hash;
  }
}
