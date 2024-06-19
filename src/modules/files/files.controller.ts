import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { FilesService } from './files.service';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { SuccessResponse } from 'src/common/responses/success.response';
import { PublicKeyResponse } from './dto/public_key/public_key.response';
import { ErrorResponse } from 'src/common/responses/error.response';

@Controller('files')
@ApiTags('Files')
export class FilesController {
  constructor(private readonly filesService: FilesService) { }

  @Get('public_key')
  async getPublicRsaKey(@Res() res: Response): Promise<void> {

    try {
      const text = await this.filesService.getTextFile('keys', 'rsa_public.pem');

      res.status(HttpStatus.OK).json(new SuccessResponse<PublicKeyResponse>(HttpStatus.OK, "", { text: text }))

    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, "", ""))
    }
  }

}
