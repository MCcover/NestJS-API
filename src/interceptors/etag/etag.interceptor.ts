import { CallHandler, ExecutionContext, HttpStatus, Injectable, NestInterceptor } from '@nestjs/common';
import { createHash } from 'crypto';
import { Request, Response } from 'express';
import { Observable, tap } from 'rxjs';

@Injectable()
export class EtagInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();

    return next.handle().pipe(
      tap((body: any) => {
        if (response.headersSent) {
          return;
        }

        const generatedETag = this.hashSHA256(JSON.stringify(body));

        const headerIfNotMatch = request.headers['if-none-match'];

        response.setHeader('ETag', generatedETag);

        if (headerIfNotMatch && headerIfNotMatch === generatedETag) {
          response.status(HttpStatus.NOT_MODIFIED).end();
        }

      })
    );
  }

  hashSHA256 = (value: string): string => {
    const hash = createHash('sha256');
    hash.update(value);

    const hashHex = hash.digest('hex');

    return hashHex;
  }
}
