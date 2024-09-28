import { Body, Controller, Post, Res } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { EncryptRequest } from './dto/encrypt/encrypt.request';
import { CryptographyService } from './cryptography.service';
import { Response } from 'express';
import { EncryptResponse } from './dto/encrypt/encrypt.response';
import { ErrorResponse } from '@common/responses/error.response';
import { HandlerError } from '@root/src/handlers/error/error.handler';
import { EmpyEncryptedText } from './errors/empy_encrypted_text.error';

@Controller('cryptography')
@ApiTags('Cryptography')
export class CryptographyController {

    constructor(private readonly cryptographyService: CryptographyService) { }

    @Post('encrypt')
    @ApiOperation({
        summary: "Use this endpoint only in development in production remove this endpoint"
    })
    async encrypt(@Body() req: EncryptRequest, @Res() res: Response): Promise<EncryptResponse> {
        if (!req.text || req.text.trim() === "") {
            throw new EmpyEncryptedText();
        }

        const encryptedText = await this.cryptographyService.encrypt(req.text);

        return new EncryptResponse(encryptedText);
    }
}
