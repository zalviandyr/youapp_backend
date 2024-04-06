import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { ProfileModule } from '../profile/profile.module';
import { MessageModule } from '../message/message.module';
import { MongooseModule } from '@nestjs/mongoose';
import { SwaggerService } from './swagger/swagger.service';
import { IsUnique } from './decorator/is-unique';

@Module({
  imports: [
    AuthModule,
    ProfileModule,
    MessageModule,
    MongooseModule.forRoot('mongodb://root:root@localhost:27017', {
      dbName: 'youapp',
      autoCreate: true,
    }),
  ],
  controllers: [],
  providers: [SwaggerService, IsUnique],
})
export class AppModule {}
