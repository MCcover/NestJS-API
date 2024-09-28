import { ExecutionContext, HttpStatus, Injectable, mixin } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { ErrorResponse } from '@common/responses/error.response';
import { AuthUser } from '@supabase/supabase-js';
import { Observable, firstValueFrom } from 'rxjs';
import { Request, Response } from 'express';

export const Authorize = (...permissions: string[]): any => {
    @Injectable()
    class Authorize extends AuthGuard('jwt') {
        private readonly _errorResponse = new ErrorResponse(HttpStatus.UNAUTHORIZED, "UNAUTHORIZED", "UNAUTHORIZED");

        constructor(private jwtService: JwtService) {
            super();
        }

        async canActivate(context: ExecutionContext): Promise<boolean> {
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

            if (permissions.length > 0) {

                var roles: string[] = payload["roles"];

                const hasPermission: boolean = this.checkIfUserHasPermission(permissions, roles);

                if (!hasPermission) {
                    response.status(HttpStatus.UNAUTHORIZED).json(this._errorResponse);
                    return false;
                }
            }

            const isValidUser = super.canActivate(context);

            if (isValidUser instanceof Observable) {
                return firstValueFrom(isValidUser);
            }

            return isValidUser;
        }

        checkIfUserHasPermission(requiredPermissions: string[], userPermissions: string[]): boolean {
            return requiredPermissions.some(permission => userPermissions.includes(permission));
        }

    };
    return mixin(Authorize);
}


