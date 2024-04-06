import { Injectable } from '@nestjs/common';

@Injectable()
export class MessageService {
  viewMessage(): string {
    return 'View Message';
  }

  sendMessage(): string {
    return 'Send Message';
  }
}
