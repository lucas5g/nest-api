import { Module } from '@nestjs/common';
import { FiiService } from './fii.service';
import { FiiController } from './fii.controller';

@Module({
  controllers: [FiiController],
  providers: [FiiService],
})
export class FiiModule {}
