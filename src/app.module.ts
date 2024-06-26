import { Module } from '@nestjs/common';
import { BookModule } from './book/book.module';
import { PrismaModule } from './prisma/prisma.module';
import { AppController } from './app.controller';
import { WordModule } from './word/word.module';
import { UserModule } from './user/user.module';
import { CacheModule, CacheInterceptor } from '@nestjs/cache-manager';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { FiiModule } from './fii/fii.module';
import { BullModule } from '@nestjs/bull';
import { MessageModule } from './message/message.module';
import { ScheduleModule } from '@nestjs/schedule';

console.log(process.pid);

@Module({
  imports: [
    BookModule,
    PrismaModule,
    WordModule,
    UserModule,
    ScheduleModule.forRoot(),
    CacheModule.register({
      isGlobal: true,
      socket: {
        host: 'locahost',
        port: 6379,
      },
    }),
    FiiModule,
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    MessageModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule {}
