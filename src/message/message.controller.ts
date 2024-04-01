import { MessageService } from '@/message/message.service';
import { Controller, Delete, Get } from '@nestjs/common';

@Controller('messages')
export class MessageController {
  constructor(private messageService: MessageService) {}
  @Get()
  findAll() {
    return this.messageService.findAll();
  }

  @Delete()
  remove() {
    return this.messageService.remove(12);
  }
}
