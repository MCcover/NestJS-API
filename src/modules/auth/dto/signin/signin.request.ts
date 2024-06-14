import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength, IsStrongPassword, isStrongPassword } from 'class-validator';

export class SigninRequest {
    @ApiProperty()
    @IsEmail({}, { message: "INVALID_EMAIL" })
    email: string;

    @ApiProperty({ minLength: 8 })
    @IsString({ message: "PASSWORD_MUST_BE_STRING" })
    @IsNotEmpty({ message: "EMPTY_PASSWORD" })
    @IsStrongPassword(
        { minLength: 8, minLowercase: 1, minNumbers: 1, minSymbols: 1, minUppercase: 1 },
        { message: "PASSWORD_TOO_WEAK" }
    )
    password: string;
}