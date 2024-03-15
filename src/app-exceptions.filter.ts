import { ExceptionFilter, Catch, ArgumentsHost, HttpException, Logger, BadRequestException } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { Request, Response } from 'express';
import axios, { AxiosError } from 'axios'
import { WsException } from '@nestjs/websockets';
import { Socket } from 'socket.io-client';
@Catch()
export class AppExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    // const response = ctx.gecontResponse<Response>();
    // const request = ctx.getRequest<Request>();
    // const status = exception instanceof HttpException ? exception.getStatus() : 500;
    const client = host.switchToWs().getClient() as Socket
    const message = exception.message
    // console.log({message, exception})
    // if(exception instanceof )
    const data = {
      statusCode: 500,
      message: "Internal server error"
    }
    // console.log(exception.getResponse().message)

    if (exception instanceof HttpException) {
      client.emit('socket-error', exception.getResponse())
      // console.log(exception.cause)
      // console.log(exception.initCause())
      // console.log(exception.name)
      // // console.log(exception.stack)
      // console.log(exception.initMessage())
      // console.log(exception.message)
      // console.log(exception.message)
      // console.log( exception.getResponse().message)
    }
    //   console.log(typeof exception)
    //   if (exception instanceof PrismaClientKnownRequestError) {
    //     if (exception.code === 'P2025') {
    //       data.message = exception.message
    //       data.statusCode = 404
    //     }
    //   }

    //   if(exception instanceof AxiosError){

    //   }

    //   // if()
    //   console.log('erro capturado')
    //   Logger.error(data)

    //   // sendEmail(daata)

    //   response
    //     .status(data.statusCode)
    //     .json(data)
  }
}
