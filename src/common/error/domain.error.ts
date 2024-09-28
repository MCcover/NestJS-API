export abstract class DomainError extends Error {

    abstract type: string;
    abstract message: string;


}