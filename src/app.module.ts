import { Module } from '@nestjs/common';
import { BookModule } from './book/book.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { AppController } from './app.controller';
import { WordModule } from './word/word.module';

@Module({
  imports: [BookModule, PrismaModule, WordModule],
  controllers: [AppController],
  providers: [PrismaService],
})
export class AppModule {}
