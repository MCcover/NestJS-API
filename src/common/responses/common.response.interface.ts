import { HttpStatus } from "@nestjs/common";

export interface CommonResponse<T> {
    statusCode: HttpStatus;
    title: string;
    data: T;
}