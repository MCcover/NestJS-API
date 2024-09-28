export class InternalValidationError extends Error {

    name = "InternalValidationError";
    data: string[];

    constructor(data: string | string[]) {
        super();
        this.data = Array.isArray(data) ? data : [data];
    }
}