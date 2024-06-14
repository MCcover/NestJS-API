import { ApiProperty } from "@nestjs/swagger";

export class SignupResponse {
    @ApiProperty()
    status: string;
}