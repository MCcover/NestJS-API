import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { SigninRequest } from './dto/signin.request';
import { ErrorResponse } from 'src/common/responses/error.response';
import { SigninResponse } from './dto/signin.response';
import { AuthService } from '../../auth.service';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { AuthCookieHelper } from '../../auth.cookies.helper';
import { HandlerError } from '@root/src/handlers/error/error.handler';

@Controller('auth')
@ApiTags('Authentication')
export class AuthSigninController {
  constructor(private readonly authService: AuthService,) { }

  @Post('signin')
  async signin(@Body() authLoginDto: SigninRequest, @Res() res: Response): Promise<SigninResponse> {
    const session = await this.authService.login(authLoginDto);

    const { access_token, refresh_token, expires_in, expires_at } = session;

    AuthCookieHelper.setCookies(res, access_token, refresh_token, expires_in, expires_at);

    return new SigninResponse("OK");
  }



}
