import { ApiProperty } from "@nestjs/swagger";

export class RefreshResponse {
    @ApiProperty()
    status: string;

    constructor(status: string) {
        this.status = status;
    }
}