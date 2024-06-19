import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EncryptRequest } from './dto/encrypt/encrypt.request';
import { CryptographyService } from './cryptography.service';
import { Response } from 'express';
import { SuccessResponse } from 'src/common/responses/success.response';
import { EncryptResponse } from './dto/encrypt/encrypt.response';
import { ErrorResponse } from 'src/common/responses/error.response';

@Controller('cryptography')
@ApiTags('Cryptography')
export class CryptographyController {

    constructor(private readonly cryptographyService: CryptographyService) { }

    @Post('encrypt')
    async encrypt(@Body() req: EncryptRequest, @Res() res: Response): Promise<void> {
        try {
            const encryptedText = await this.cryptographyService.encrypt(req.text);
            res.status(HttpStatus.OK).json(new SuccessResponse<EncryptResponse>(HttpStatus.OK, "", {
                encryptedText: encryptedText
            }));
        } catch (error) {
            res.status(HttpStatus.OK).json(new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, "", error));
        }
    }
}
