import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { ProfileModule } from './profile/profile.module';
import { MessageModule } from './message/message.module';

@Module({
  imports: [AuthModule, CommonModule, ProfileModule, MessageModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
