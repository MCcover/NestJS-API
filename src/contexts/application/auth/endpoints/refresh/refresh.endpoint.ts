import { Body, Controller, HttpStatus, Post, Req, Res, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "../../auth.service";
import { ApiTags } from "@nestjs/swagger";
import { ErrorResponse } from "@root/src/common/responses/error.response";
import { RefreshResponse } from "./dto/refresh.response";
import { Request, Response } from "express";
import { AuthCookieHelper } from "../../auth.cookies.helper";
import { InvalidCredentialsError } from "../../errors/invalid_credentials.error";
import { HandlerError } from "@root/src/handlers/error/error.handler";

@Controller('auth')
@ApiTags('Authentication')
export class AuthRefreshController {
    constructor(private readonly authService: AuthService,) { }

    @Post('refresh')
    async refresh(@Req() req: Request, @Res() res: Response): Promise<RefreshResponse> {
        try {
            if (!req.cookies) {
                throw new UnauthorizedException();
            }

            if (!req.cookies.refresh_token) {
                throw new UnauthorizedException();
            }

            const jwt = req.cookies.refresh_token;

            const authResult = await this.authService.refresh(jwt);

            if (authResult.error) {
                throw new InvalidCredentialsError();
            }

            const session = authResult.data.session;

            const { access_token, refresh_token, expires_in, expires_at } = session;

            AuthCookieHelper.setCookies(res, access_token, refresh_token, expires_in, expires_at);

            return new RefreshResponse('OK');
        } catch (error) {
            AuthCookieHelper.clearCookies(res);

            throw error;
        }
    }
}