import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../../services/supabase/supabase.service';

@Injectable()
export class FilesService {

    private PRIVATE_RSA: string;
    private PUBLIC_RSA: string;
    private SECRET_RSA: string;

    constructor(private readonly fileService: SupabaseService) { }

    public async getTextFile(bucket: string, filename: string): Promise<string> {
        return await this.fileService.getTextFile(bucket, filename);
    }

    async getPublicRsaKey(): Promise<string> {
        if (!this.PUBLIC_RSA) {
            this.PUBLIC_RSA = (await this.getTextFile('keys', 'rsa_public.pem'));
        }
        return this.PUBLIC_RSA;
    }

    async getPrivateRsaKey(): Promise<string> {
        if (!this.PRIVATE_RSA) {
            this.PRIVATE_RSA = (await this.getTextFile('keys', 'rsa_private.pem'));
        }
        return this.PRIVATE_RSA;
    }

    async getSecretRsa(): Promise<string> {
        if (!this.SECRET_RSA) {
            this.SECRET_RSA = (await this.getTextFile('keys', 'secret.txt'));
        }
        return this.SECRET_RSA;
    }
}
