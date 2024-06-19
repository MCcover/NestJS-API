import { Module } from '@nestjs/common';
import { CryptographyService } from './cryptography.service';
import { FilesService } from 'src/modules/files/files.service';
import { FilesModule } from 'src/modules/files/files.module';

@Module({
  imports: [FilesModule],
  providers: [CryptographyService],
  exports: [CryptographyService]
})
export class CryptographyModule { }
