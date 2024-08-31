import { Body, Controller, HttpStatus, Post, Req, Res, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninRequest } from './dto/signin/signin.request';
import { Request, Response } from 'express';
import { ApiCookieAuth, ApiTags } from '@nestjs/swagger';
import { SignupRequest } from './dto/signup/signup.request';
import { SignupResponse } from './dto/signup/signup.response';
import { ErrorResponse } from 'src/common/responses/error.response';
import { SigninResponse } from './dto/signin/signin.response';
import { RefreshResponse } from './dto/refresh/refresh.response';
import { Authorize } from './guards/authorize.guard';
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

      return new SigninResponse("OK");
    } catch (error) {
      if (error instanceof Error) {
        new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, "", error.message)
      }
    }
  }

  @Post('signin')
  async signin(@Body() authLoginDto: SigninRequest, @Res() res: Response): Promise<SigninResponse | ErrorResponse> {
    try {
      const session = await this.authService.login(authLoginDto);

      const { access_token, refresh_token, expires_in, expires_at } = session;

      this.setCookies(res, access_token, refresh_token, expires_in, expires_at);

      return new SigninResponse("OK");
    } catch (error) {
      return new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, "", error.message);
    }
  }

  @Post('refresh')
  async refresh(@Req() req: Request, @Res() res: Response): Promise<RefreshResponse | ErrorResponse> {
    try {

      if (!req.cookies) {
        throw new UnauthorizedException();
      }

      if (!req.cookies.refresh_token) {
        throw new UnauthorizedException();
      }

      const jwt = req.cookies.refresh_token;

      const authResult = await this.authService.refresh(jwt);

      if (!authResult) {
        throw new UnauthorizedException();
      }

      if (!authResult.data) {
        throw new UnauthorizedException();
      }

      if (!authResult.data.session) {
        throw new UnauthorizedException();
      }

      const session = authResult.data.session;

      const { access_token, refresh_token, expires_in, expires_at } = session;

      this.setCookies(res, access_token, refresh_token, expires_in, expires_at);

      return new RefreshResponse('OK');
    } catch (error) {

      await this.logout(req, res);

      return new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, "", error.message);
    }
  }


  @Post('logout')
  //@UseGuards(Authorize(ROLES.USER, ROLES.ADMIN))
  @ApiCookieAuth()
  async logout(@Req() req: Request, @Res() res: Response): Promise<void | ErrorResponse> {
    try {
      if (req.cookies) {
        const jwtToken = req.cookies.access_token;
        if (jwtToken) {
          await this.authService.logout(jwtToken);
        }
      }

      this.clearCookies(res);
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        return new ErrorResponse(HttpStatus.UNAUTHORIZED, "", "UNAUTHORIZED")
      } else if (error instanceof Error) {
        return new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, "", error.message);
      }
    }
  }

  clearCookies(res: Response) {
    res.clearCookie('access_token');
    res.clearCookie('refresh_token');
    res.clearCookie('expires_in');
    res.clearCookie('expires_at');
  }

  setCookies(
    res: Response,
    access_token: string,
    refresh_token: string,
    expires_in: number,
    expires_at: number
  ) {
    this.setCookie(res, 'access_token', access_token);
    this.setCookie(res, 'refresh_token', refresh_token);
    this.setCookie(res, 'expires_in', expires_in);
    this.setCookie(res, 'expires_at', expires_at);
  }

  setCookie(res: Response, name: string, value: any) {
    res.cookie(name, value, { httpOnly: true, secure: true, sameSite: 'lax' });
  }

}
