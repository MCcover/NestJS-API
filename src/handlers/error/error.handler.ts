import { HttpStatus } from "@nestjs/common";
import { DomainError } from "@root/src/common/error/domain.error";
import { ErrorResponse } from "@root/src/common/responses/error.response";
import { InternalValidationError } from "@root/src/pipes/errorValidation/validation.error";


export const HandlerError = (error: Error): ErrorResponse => {
    if (error instanceof DomainError) {
        return new ErrorResponse(HttpStatus.BAD_REQUEST, error.type, error.message);
    } else if (error instanceof InternalValidationError) {
        return new ErrorResponse(HttpStatus.BAD_REQUEST, error.name, error.data);
    } else {
        return new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, "Internal Server Error", error.message || error.message.length > 0 ? [error.name, error.message] : error.name);
    }
}