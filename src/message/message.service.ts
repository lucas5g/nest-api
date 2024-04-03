import { Inject, Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Cron } from '@nestjs/schedule';

import { setTimeout } from 'timers/promises';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';

@Injectable()
//@Processor('message')
export class MessageService {
  constructor(
    // @InjectQueue('message') private messageQueue: Queue,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}
  create(createMessageDto: CreateMessageDto) {
    console.log({createMessageDto});
    return 'This action adds a new message';
  }

  findAll() {
    return `This action returns all message`;
  }

  findOne(id: number) {
    return `This action returns a #${id} message`;
  }

  update(id: number, updateMessageDto: UpdateMessageDto) {
    console.log(updateMessageDto);
    return `This action updates a #${id} message`;
  }

  @Cron('32 55 11 * * *', { name: 'message-remove' })
  async remove(id: number) {

    console.log(process.env.CLUSTER_ID)
    console.log(process.pid)
    await this.cacheManager.set('removeMessage', true, 10_000);

    console.log(await this.cacheManager.get('removeMessage'))

    console.log('remove');
    return `This action removes a #${id} message`;
  }
}
