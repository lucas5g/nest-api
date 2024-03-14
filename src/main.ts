import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, Logger, ValidationPipe } from '@nestjs/common';
import { startCluster } from '@/utils/start-cluster';
import { randomInt } from 'node:crypto';
import { AppExceptionsFilter } from '@/app-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger:['error', 'debug'],

  });
  // app.useGlobalFilters(new AppExceptionsFilter());

  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  // app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)))

  const port = 3333;
  await app.listen(port);
  Logger.debug('http://localhost:3333')

}
bootstrap()
// startCluster(bootstrap)

