import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'user',
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
