import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { ProfileModule } from './profile/profile.module';
import { MessageModule } from './message/message.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    AuthModule,
    CommonModule,
    ProfileModule,
    MessageModule,
    MongooseModule.forRoot('mongodb://root:root@localhost:27017', {
      dbName: 'youapp',
      autoCreate: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
