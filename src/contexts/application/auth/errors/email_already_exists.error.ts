import { DomainError } from "@root/src/common/error/domain.error";


export class EmailAlreadyExistsError extends DomainError {
    type = "EmailExistsError";
    message = "Email alredy exists";
}