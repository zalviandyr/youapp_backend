import { Module } from '@nestjs/common';
import { DatabaseService } from './database/database.service';
import { SwaggerService } from './swagger/swagger.service';

@Module({
  providers: [DatabaseService, SwaggerService],
})
export class CommonModule {}
