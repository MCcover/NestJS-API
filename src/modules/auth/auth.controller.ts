import { Body, Controller, HttpCode, HttpStatus, Post, Req, Res, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninRequest } from './dto/signin/signin.request';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { Request, Response } from 'express';
import { ApiCookieAuth, ApiTags } from '@nestjs/swagger';
import { SignupRequest } from './dto/signup/signup.request';
import { SignupResponse } from './dto/signup/signup.response';
import { SuccessResponse } from 'src/common/responses/success.response';
import { ErrorResponse } from 'src/common/responses/error.response';
import { SigninResponse } from './dto/signin/signin.response';

@Controller('auth')
@ApiTags('Authentication')
export class AuthController {
  constructor(private readonly service: AuthService) { }

  @Post('signup')
  async signup(@Body() createUserDto: SignupRequest, @Res() res: Response): Promise<void> {

    try {
      var user = await this.service.create(createUserDto);
      if (!user) {
        throw new Error("Cannot create user");
      }

      res.status(HttpStatus.OK).json(
        new SuccessResponse<SignupResponse>(HttpStatus.OK, "", {
          status: "OK"
        })
      );

    } catch (error) {
      if (error instanceof Error) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, "", error.message))
      }
    }
  }

  @Post('signin')
  @HttpCode(200)
  async signin(@Body() authLoginDto: SigninRequest, @Res({ passthrough: true }) res: Response): Promise<void> {
    try {
      const { access_token, refresh_token } = await this.service.login(authLoginDto);

      res.cookie('access_token', access_token, { httpOnly: true });
      res.cookie('refresh_token', refresh_token, { httpOnly: true });

      res.status(HttpStatus.OK).json(new SuccessResponse<SigninResponse>(HttpStatus.OK, "", {
        status: "OK"
      }));
    } catch (error) {
      if (error instanceof Error) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, "", error.message))
      }
    }
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @ApiCookieAuth()
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<void> {
    try {
      const jwtToken = req.cookies.access_token;
      if (!jwtToken) throw new UnauthorizedException();

      await this.service.logout(jwtToken);

      res.clearCookie('access_token');
      res.clearCookie('refresh_token');
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        res.status(HttpStatus.UNAUTHORIZED).json(new ErrorResponse(HttpStatus.UNAUTHORIZED, "", "UNAUTHORIZED"))
      } else if (error instanceof Error) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, "", error.message))
      }
    }
  }

}
