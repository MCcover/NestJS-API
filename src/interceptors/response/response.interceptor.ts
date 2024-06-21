import { CallHandler, ExecutionContext, HttpStatus, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, catchError, map } from 'rxjs';
import { ErrorResponse } from 'src/common/responses/error.response';
import { SuccessResponse } from 'src/common/responses/success.response';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse();

    return next.handle().pipe(
      map((data) => {
        if (data instanceof ErrorResponse) {
          var errorResponse = data as ErrorResponse;

          response.status(errorResponse.statusCode).json(data);
        } else {
          response.status(HttpStatus.OK).json(new SuccessResponse(HttpStatus.OK, "", data));
        }
      }),
      catchError((error) => {
        if (error instanceof ErrorResponse) {
          var errorResponse = error as ErrorResponse;

          response.status(errorResponse.statusCode).json(errorResponse);
        } else {
          response.status(HttpStatus.INTERNAL_SERVER_ERROR)
            .json(new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, "", error.message));
        }
        throw "Error";
      })
    );
  }
}
