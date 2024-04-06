import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { MessageService } from './message.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { MessageDto } from './dto/message.dto';

@Controller()
@UseGuards(AuthGuard)
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Get('viewMessage')
  viewMessage(@Request() req) {
    const userId = req.user;

    return this.messageService.viewMessage(userId);
  }

  @Post('sendMessage')
  sendMessage(@Request() req, @Body() data: MessageDto) {
    const userId = req.user;

    return this.messageService.sendMessage(data, userId);
  }
}
