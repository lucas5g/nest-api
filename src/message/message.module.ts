import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageGateway } from './message.gateway';
import { MessageController } from './message.controller';
@Module({
  imports: [
    // CacheModule.register()
      // {
      // store: redisStore as any,

      // host: 'localhost',
      // port: 6379,
    // })0
  ],

  providers: [MessageGateway, MessageService],
  controllers: [MessageController],
})
export class MessageModule { }
