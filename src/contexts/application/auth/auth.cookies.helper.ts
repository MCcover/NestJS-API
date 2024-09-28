import { Response } from "express";

export class AuthCookieHelper {

    static setCookies(
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

    static setCookie(res: Response, name: string, value: any) {
        res.cookie(name, value, { httpOnly: true, secure: true, sameSite: 'lax' });
    }

    static clearCookies(res: Response) {
        res.clearCookie('access_token');
        res.clearCookie('refresh_token');
        res.clearCookie('expires_in');
        res.clearCookie('expires_at');
    }

}

