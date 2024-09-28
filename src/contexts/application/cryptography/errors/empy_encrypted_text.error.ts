import { DomainError } from "@root/src/common/error/domain.error";

export class EmpyEncryptedText extends DomainError {
    type = "EmpyEncryptedText";
    message = "Empty text to encrypt";
}