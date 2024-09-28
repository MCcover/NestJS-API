import { Injectable, ValidationError, ValidationPipe } from '@nestjs/common';
import { ErrorResponse } from '@common/responses/error.response';
import { InternalValidationError } from './validation.error';

@Injectable()
export class ErrorValidationPipe extends ValidationPipe {

  createExceptionFactory(): (validationErrors?: ValidationError[]) => ErrorResponse {
    return (validationErrors: ValidationError[] = []) => {
      const messages = this.flattenValidationErrors(validationErrors);
      throw new InternalValidationError(messages);
    };
  }

  protected flattenValidationErrors(validationErrors: ValidationError[]): string[] {
    return validationErrors.map(error => {
      return Object.values(error.constraints);
    }).flat();
  }
}
