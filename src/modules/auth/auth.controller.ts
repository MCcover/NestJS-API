import { Body, Controller, HttpStatus, Post, Req, Res, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninRequest } from './dto/signin/signin.request';
import { Authorize } from './guards/authorize.guard';
import { Request, Response } from 'express';
import { ApiCookieAuth, ApiTags } from '@nestjs/swagger';
import { SignupRequest } from './dto/signup/signup.request';
import { SignupResponse } from './dto/signup/signup.response';
import { ErrorResponse } from 'src/common/responses/error.response';
import { SigninResponse } from './dto/signin/signin.response';
import { ROLES } from 'src/common/constants/auth.constants';

@Controller('auth')
@ApiTags('Authentication')
export class AuthController {
  constructor(private readonly authService: AuthService,) { }

  @Post('signup')
  async signup(@Body() createUserDto: SignupRequest): Promise<SignupResponse | ErrorResponse> {

    try {
      var user = await this.authService.create(createUserDto);
      if (!user) {
        throw new Error("Cannot create user");
      }


      return {
        status: "OK"
      };

    } catch (error) {
      if (error instanceof Error) {
        new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, "", error.message)
      }
    }
  }

  @Post('signin')
  async signin(@Body() authLoginDto: SigninRequest, @Res() res: Response): Promise<SigninResponse | ErrorResponse> {
    try {
      const { access_token, refresh_token } = await this.authService.login(authLoginDto);

      res.cookie('access_token', access_token, { httpOnly: true, secure: true, sameSite: 'lax' });
      res.cookie('refresh_token', refresh_token, { httpOnly: true, secure: true, sameSite: 'lax' });

      return {
        status: "OK"
      };
    } catch (error) {
      return new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, "", error.message);
    }
  }

  @Post('logout')
  //@UseGuards(Authorize(ROLES.USER, ROLES.ADMIN))
  @ApiCookieAuth()
  async logout(@Req() req: Request, @Res() res: Response): Promise<void | ErrorResponse> {
    try {
      const jwtToken = req.cookies.access_token;
      if (!jwtToken) throw new UnauthorizedException();

      await this.authService.logout(jwtToken);

      res.clearCookie('access_token');
      res.clearCookie('refresh_token');
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        return new ErrorResponse(HttpStatus.UNAUTHORIZED, "", "UNAUTHORIZED")
      } else if (error instanceof Error) {
        return new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, "", error.message);
      }
    }
  }

}
