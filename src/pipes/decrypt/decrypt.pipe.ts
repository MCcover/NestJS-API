import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_ENCRYPTED, IsEncrypted } from 'src/common/decorators/is_encrypted/is_encrypted.decorator';
import { CryptographyService } from 'src/modules/services/cryptography/cryptography.service';

@Injectable()
export class DecryptPipe implements PipeTransform {

  constructor(private reflector: Reflector, private readonly cryptographyService: CryptographyService) {

  }

  async transform(value: any, metadata: ArgumentMetadata) {
    // const keys = Object.keys(value);

    // for (let i = 0; i < keys.length; i++) {

    //   const key = keys[i];

    //   var m = Reflect.getMetadataKeys(value, key);
    //   const isEncrypted = this.reflector.get<boolean>(IS_ENCRYPTED, metadata.metatype.prototype);


    //   console.log(`Decoradores de ${key}: `, m)
    //   const mv = Reflect.getMetadata(IsEncrypted, value, key);

    //   const x = 0;
    //   // if (isEncrypted) {
    //   //   value[key] = await this.cryptographyService.decrypt(value[key]);
    //   // }
    // }

    return value;
  }

}
