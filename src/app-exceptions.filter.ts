import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
} from '@nestjs/common';
import { Socket } from 'socket.io-client';

@Catch()
export class AppExceptionsFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const client = host.switchToWs().getClient() as Socket;

    client.emit('msg_error', exception.getResponse());
  }
}
