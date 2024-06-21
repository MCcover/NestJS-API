import { ExecutionContext, HttpStatus, Injectable, mixin } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { ErrorResponse } from 'src/common/responses/error.response';
import { AuthUser } from '@supabase/supabase-js';
import { Observable } from 'rxjs';
import { Request, Response } from 'express';

export const Authorize = (...permission: string[]): any => {
    @Injectable()
    class Authorize extends AuthGuard('jwt') {
        private readonly _errorResponse = new ErrorResponse(HttpStatus.UNAUTHORIZED, "UNAUTHORIZED", "UNAUTHORIZED");

        constructor(private jwtService: JwtService) {
            super();
        }

        canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
            var http = context.switchToHttp();

            const request: Request = http.getRequest();
            const response: Response = http.getResponse();

            const accessToken = request.cookies['access_token'];

            if (!accessToken) {
                response.status(HttpStatus.UNAUTHORIZED).json(this._errorResponse);
                return false;
            }

            let payload: AuthUser;
            try {
                payload = this.jwtService.decode(accessToken, { json: true });
            } catch (err) {
                response.status(HttpStatus.UNAUTHORIZED).json(this._errorResponse);
                return false;
            }

            if (!payload || !payload.email) {
                response.status(HttpStatus.UNAUTHORIZED).json(this._errorResponse);
                return false;
            }

            if (permission.length > 0) {
                //TODO: implement obtaining user permissions and validation.

                const hasPermission: boolean = true;

                if (!hasPermission) {
                    response.status(HttpStatus.UNAUTHORIZED).json(this._errorResponse);
                    return false;
                }
            }

            return super.canActivate(context);
        }

    }
    return mixin(Authorize);
}


