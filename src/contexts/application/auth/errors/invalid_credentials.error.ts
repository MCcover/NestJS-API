import { DomainError } from "@root/src/common/error/domain.error";


export class InvalidCredentialsError extends DomainError {
    type = "InvalidCredentialsError";
    message = "Invalid Credentials";
}