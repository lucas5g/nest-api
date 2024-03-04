import { Module } from '@nestjs/common';
import { BookModule } from './book/book.module';
import { PrismaModule } from './prisma/prisma.module';
import { AppController } from './app.controller';
import { WordModule } from './word/word.module';
import { UserModule } from './user/user.module';
import { CacheModule, CacheInterceptor } from '@nestjs/cache-manager';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ManageModule } from './manage/manage.module';
@Module({
  imports: [
    BookModule,
    PrismaModule,
    WordModule,
    UserModule,
    CacheModule.register(),
    ManageModule,
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
