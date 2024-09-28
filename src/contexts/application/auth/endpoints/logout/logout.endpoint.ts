import { Body, Controller, HttpStatus, Post, Req, Res, UnauthorizedException, UseGuards } from "@nestjs/common";
import { AuthService } from "../../auth.service";
import { ApiCookieAuth, ApiTags } from "@nestjs/swagger";
import { ErrorResponse } from "@root/src/common/responses/error.response";
import { Authorize } from "@guards/authorize.guard";
import { LogoutResponse } from "./dto/logout.response";
import { Request, Response } from "express";
import { AuthCookieHelper } from "../../auth.cookies.helper";

@Controller('auth')
@ApiTags('Authentication')
export class AuthLogoutController {
    constructor(private readonly authService: AuthService,) { }

    @Post('logout')
    @UseGuards(Authorize())
    @ApiCookieAuth()
    async logout(@Req() req: Request, @Res() res: Response): Promise<LogoutResponse> {
        if (req.cookies) {
            const jwtToken = req.cookies.access_token;
            if (jwtToken) {
                await this.authService.logout(jwtToken);
            }
        }

        AuthCookieHelper.clearCookies(res);
        return new LogoutResponse("OK");
    }


}