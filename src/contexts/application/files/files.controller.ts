import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { FilesService } from './files.service';
import { ApiTags } from '@nestjs/swagger';
import { PublicKeyResponse } from './dto/public_key/public_key.response';
import { EtagInterceptor } from '@root/src/interceptors/etag/etag.interceptor';

@Controller('files')
@ApiTags('Files')
export class FilesController {
  constructor(private readonly filesService: FilesService) { }


  @Get('public_key')
  @UseInterceptors(EtagInterceptor)
  async getPublicRsaKey(): Promise<PublicKeyResponse> {
    const text = await this.filesService.getTextFile('keys', 'rsa_public.pem');

    return new PublicKeyResponse(text);
  }

}
