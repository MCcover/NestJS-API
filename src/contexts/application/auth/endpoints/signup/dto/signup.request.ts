import { ApiProperty } from '@nestjs/swagger';
import { IsEncrypted } from '@root/src/decorators/is_encrypted/is_encrypted.decorator';
import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';

export class SignupRequest {
  @ApiProperty()
  @IsEmail({}, { message: "INVALID_EMAIL" })
  email: string;

  @ApiProperty()
  @IsString({ message: "NAME_MUST_BE_STRING" })
  @IsNotEmpty({ message: "EMPTY_NAME" })
  name: string;

  @ApiProperty()
  @IsString({ message: "NAME_MUST_BE_STRING" })
  @IsNotEmpty({ message: "EMPTY_LASTNAME" })
  lastname: string;

  @ApiProperty()
  phone: string;

  @ApiProperty({ minLength: 8 })
  @IsEncrypted()
  @IsString({ message: "PASSWORD_MUST_BE_STRING" })
  @IsNotEmpty({ message: "EMPTY_PASSWORD" })
  @IsStrongPassword(
    { minLength: 8, minLowercase: 1, minNumbers: 1, minSymbols: 1, minUppercase: 1 },
    { message: "PASSWORD_TOO_WEAK" }
  )
  password: string;
}
