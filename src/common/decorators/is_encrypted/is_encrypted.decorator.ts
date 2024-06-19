import { PropertyDecoratorFactory } from '@loopback/metadata/dist/decorator-factory';

export const IS_ENCRYPTED_KEY = 'isEncrypted';

export function IsEncrypted(): PropertyDecorator {
    return PropertyDecoratorFactory.createDecorator<boolean>(
        IS_ENCRYPTED_KEY,
        true,
    );
}