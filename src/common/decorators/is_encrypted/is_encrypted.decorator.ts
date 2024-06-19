import { SetMetadata } from '@nestjs/common';

export const IS_ENCRYPTED: string = "is_encrypted";

export const IsEncrypted = (): PropertyDecorator => SetMetadata(IS_ENCRYPTED, true);
