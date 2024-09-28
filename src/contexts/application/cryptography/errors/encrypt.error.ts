import { DomainError } from "@root/src/common/error/domain.error";

export class EncryptError extends DomainError {
    type = "EncryptError";
    message = "Error on encrypt message";
}