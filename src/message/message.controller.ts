import { Controller, Get, Post } from '@nestjs/common';
import { MessageService } from './message.service';

@Controller()
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Get('viewMessage')
  viewMessage() {
    return this.messageService.viewMessage();
  }

  @Post('sendMessage')
  sendMessage() {
    return this.messageService.sendMessage();
  }
}
