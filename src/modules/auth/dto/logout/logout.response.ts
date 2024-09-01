import { ApiProperty } from "@nestjs/swagger";

export class LogoutResponse {
    @ApiProperty()
    status: string;

    constructor(status: string) {
        this.status = status;
    }
}