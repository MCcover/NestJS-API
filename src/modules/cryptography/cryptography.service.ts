import { Injectable } from '@nestjs/common';
import { FilesService } from 'src/modules/files/files.service';

import { privateDecrypt, publicEncrypt } from 'crypto';

@Injectable()
export class CryptographyService {

    constructor(private readonly fileService: FilesService) { }

    async encrypt(text: string) {
        try {
            const publicKey: string = await this.fileService.getPublicRsaKey();

            const buffer = Buffer.from(text, 'utf8');
            const encryptedBuffer = publicEncrypt(publicKey, buffer);

            const encryptedText = encryptedBuffer.toString('base64');
            return encryptedText;
        } catch (error) {
            console.error('Ha ocurrido un error al encriptar: ', error);
        }

        return '';
    }

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
