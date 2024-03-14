import { ExceptionFilter, Catch, ArgumentsHost, HttpException, Logger } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { Request, Response } from 'express';
import axios, { AxiosError } from 'axios'
@Catch()
export class AppExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception instanceof HttpException ? exception.getStatus() : 500;

    // if(exception instanceof )
    const data = {
      statusCode: 500,
      message: "Internal server error"
    }

    if (exception instanceof PrismaClientKnownRequestError) {
      if (exception.code === 'P2025') {
        data.message = exception.message
        data.statusCode = 404
      }
    }

    if(exception instanceof AxiosError){

    }

    // if()

    Logger.error(data)

    // sendEmail(daata)

    response
      .status(data.statusCode)
      .json(data)
  }
}
