import { Injectable } from '@nestjs/common';
import { FilesService } from 'src/modules/files/files.service';

import { privateDecrypt } from 'crypto';

@Injectable()
export class CryptographyService {

    constructor(private readonly fileService: FilesService) { }

    async decrypt(encryptedText: string) {

        try {
            const privateRsaKey: string = await this.fileService.getPrivateRsaKey();
            const secretRsa: string = await this.fileService.getSecretRsa();

            const bufferEncrypted = Buffer.from(encryptedText, 'base64');
            const bufferDecrypted = privateDecrypt(
                {
                    key: privateRsaKey,
                    passphrase: secretRsa,
                },
                bufferEncrypted
            );
            return bufferDecrypted.toString('utf8');

        } catch (error) {
            console.log("Ha ocurrido un error al desencriptar: ", error);
        }

        return '';
    }


}
