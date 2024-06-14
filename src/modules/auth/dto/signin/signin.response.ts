import { ApiProperty } from "@nestjs/swagger";

export class SigninResponse {
    @ApiProperty()
    status: string;
}