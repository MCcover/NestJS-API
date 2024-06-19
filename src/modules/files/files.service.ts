import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../services/supabase/supabase.service';

@Injectable()
export class FilesService {
    constructor(private readonly fileService: SupabaseService) { }

    public async getTextFile(bucket: string, filename: string): Promise<string> {
        return await this.fileService.getTextFile(bucket, filename);
    }

    async getPublicRsaKey(): Promise<string> {
        return (await this.getTextFile('keys', 'rsa_public.pem'));
    }

    async getPrivateRsaKey(): Promise<string> {
        return (await this.getTextFile('keys', 'rsa_private.pem'));
    }

    async getSecretRsa(): Promise<string> {
        return (await this.getTextFile('keys', 'secret.txt'));
    }
}
