import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { BookModule } from './book/book.module';
import { PrismaModule } from './prisma/prisma.module';
import { AppController } from './app.controller';
import { WordModule } from './word/word.module';
import { UserModule } from './user/user.module';
import { CacheModule, CacheInterceptor } from '@nestjs/cache-manager';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CacheResetMiddleware } from './middlewares/cache-reset.middleware';
@Module({
  imports: [
    BookModule,
    PrismaModule,
    WordModule,
    UserModule,
    CacheModule.register(),
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CacheResetMiddleware).forRoutes('*');
  }
}
