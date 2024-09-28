import { Injectable } from '@nestjs/common';

import { privateDecrypt, publicEncrypt } from 'crypto';
import { FilesService } from '../files/files.service';

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
                bufferEncrypted,
            );

            var decryptedText = bufferDecrypted.toString('utf8');

            return decryptedText;

        } catch {
        }

        return '';
    }
}
