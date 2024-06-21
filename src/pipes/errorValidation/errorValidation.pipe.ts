import { ArgumentMetadata, BadRequestException, HttpStatus, Injectable, Type, ValidationError, ValidationPipe } from '@nestjs/common';
import { ValidationOptions } from 'class-validator';
import { ErrorResponse } from 'src/common/responses/error.response';

@Injectable()
export class ErrorValidationPipe extends ValidationPipe {
  createExceptionFactory(): (validationErrors?: ValidationError[]) => ErrorResponse {
    return (validationErrors: ValidationError[] = []) => {
      const messages = this.flattenValidationErrors(validationErrors);
      return new ErrorResponse(HttpStatus.BAD_REQUEST, 'Validation Error', messages);
    };
  }

  protected flattenValidationErrors(validationErrors: ValidationError[]): string[] {
    return validationErrors.map(error => {
      return Object.values(error.constraints);
    }).flat();
  }
}
