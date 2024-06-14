import { HttpStatus } from "@nestjs/common";
import { CommonResponse } from "./common.response.interface";

export class SuccessResponse<T> implements CommonResponse<T> {
    statusCode: HttpStatus;
    title: string;
    data: T;

    constructor(statusCode: HttpStatus, title: string, data: T) {
        this.statusCode = statusCode;
        this.title = title;
        this.data = data;
    }

}