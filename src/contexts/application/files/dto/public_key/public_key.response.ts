import { ApiProperty } from "@nestjs/swagger";

export class PublicKeyResponse {

    @ApiProperty()
    text: string;

    constructor(text: string) {
        this.text = text;
    }
}