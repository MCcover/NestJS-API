import { ArgumentMetadata, BadRequestException, HttpStatus, Injectable, Type, ValidationError, ValidationPipe } from '@nestjs/common';
import { ValidationOptions } from 'class-validator';
import { ErrorResponse } from 'src/common/responses/error.response';

@Injectable()
export class CustomValidationPipe extends ValidationPipe {
  createExceptionFactory(): (validationErrors?: ValidationError[]) => BadRequestException {
    return (validationErrors: ValidationError[] = []) => {
      const messages = this.flattenValidationErrors(validationErrors);
      return new BadRequestException(
        new ErrorResponse(HttpStatus.BAD_REQUEST, 'Validation Error', messages)

      );
    };
  }

  protected flattenValidationErrors(validationErrors: ValidationError[]): string[] {
    return validationErrors.map(error => {
      return Object.values(error.constraints);
    }).flat();
  }
}
