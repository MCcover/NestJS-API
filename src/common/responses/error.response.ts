import { HttpException, HttpStatus } from "@nestjs/common";
import { CommonResponse } from "./common.response.interface";

export class ErrorResponse implements CommonResponse<string> {
    statusCode: HttpStatus;
    title: string;
    data: string;

    constructor(statusCode: HttpStatus, title: string, data: string) {
        this.statusCode = statusCode;
        this.title = title;
        this.data = data;
    }

}