import { CallHandler, ExecutionContext, HttpStatus, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, catchError, map } from 'rxjs';
import { SuccessResponse } from '@common/responses/success.response';
import { Response } from 'express';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse<Response>();

    return next.handle().pipe(
      map((data) => {
        if (!response.headersSent) {
          response.status(HttpStatus.OK).json(new SuccessResponse(HttpStatus.OK, "", data));
        }
        return data;
      }),
      catchError((error) => {
        throw error;
      })
    );
  }
}
