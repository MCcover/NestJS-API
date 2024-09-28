import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { DomainError } from '@root/src/common/error/domain.error';
import { ErrorResponse } from '@root/src/common/responses/error.response';
import { HandlerError } from '@root/src/handlers/error/error.handler';
import { Response } from 'express';

@Catch(DomainError, Error)
export class ErrorFilter implements ExceptionFilter {
  catch(exception: DomainError | Error, host: ArgumentsHost) {

    var ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (!response.headersSent) {
      var errorResponse: ErrorResponse = HandlerError(exception);

      response.status(errorResponse.statusCode).json(errorResponse);
    }

  }
}
