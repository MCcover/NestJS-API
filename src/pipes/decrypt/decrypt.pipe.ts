import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { IS_ENCRYPTED_KEY } from '@root/src/decorators/is_encrypted/is_encrypted.decorator';
import { MetadataInspector } from '@loopback/metadata/dist/inspector';
import { CryptographyService } from '@root/src/contexts/application/cryptography/cryptography.service';

@Injectable()
export class DecryptPipe implements PipeTransform {

  constructor(private readonly cryptographyService: CryptographyService) {

  }

  async transform(value: any, metadata: ArgumentMetadata) {

    const allProps = MetadataInspector.getAllPropertyMetadata<boolean>(
      IS_ENCRYPTED_KEY,
      metadata.metatype.prototype,
    );

    for (const prop in allProps) {

      var text = value[prop];

      value[prop] = await this.cryptographyService.decrypt(text);
    }

    return value;
  }

}
