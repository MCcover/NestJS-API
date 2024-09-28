import { Module } from '@nestjs/common';
import { CryptographyService } from './cryptography.service';
import { CryptographyController } from './cryptography.controller';
import { FilesModule } from '../files/files.module';

@Module({
  imports: [FilesModule],
  providers: [CryptographyService],
  exports: [CryptographyService],
  controllers: [CryptographyController]
})
export class CryptographyModule { }
