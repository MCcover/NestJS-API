import { Module } from '@nestjs/common';
import { CryptographyService } from './cryptography.service';
import { FilesService } from 'src/modules/files/files.service';
import { FilesModule } from 'src/modules/files/files.module';
import { CryptographyController } from './cryptography.controller';

@Module({
  imports: [FilesModule],
  providers: [CryptographyService],
  exports: [CryptographyService],
  controllers: [CryptographyController]
})
export class CryptographyModule { }
