import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { MessageService } from './message.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller()
@UseGuards(AuthGuard)
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
