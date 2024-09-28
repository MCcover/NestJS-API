import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import dateToString from '@root/src/utils/date/date.utils';
import { AuthUser } from '@supabase/supabase-js';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  private readonly logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction): void {
    const startAt = process.hrtime();

    const filterBody = (body: any) => {
      var bodyCopy = { ...body };

      if (bodyCopy.password) {
        bodyCopy.password = '';
      }

      return bodyCopy;
    };

    var idUser: string = '';
    var emailUser: string = '';

    const accessToken = req.cookies['access_token'];
    if (accessToken) {
      let payload: AuthUser;
      try {
        payload = new JwtService().decode(accessToken, { json: true });
      } catch { }

      idUser = payload.id;
      emailUser = payload.email;
    }

    res.on('finish', async () => {
      const diff = process.hrtime(startAt);
      const responseTime = diff[0] * 1e3 + diff[1] * 1e-6;

      const logMessage = [
        `Date: ${dateToString(new Date())}`, // Fecha y hora
        `IP: ${req.ip}`, // IP
        `User Agent: ${req.headers['user-agent'].replace(/;/g, ',')}`, // User-Agent
        `Protocol: ${req.protocol}`, // Protocolo
        `HTTP Method: ${req.method}`, // Método HTTP
        `Endpoint: ${req.originalUrl}`, // Endpoint
        `Query Parameters: ${JSON.stringify(req.query)}`, // Parámetros de consulta
        `Body: ${JSON.stringify(filterBody(req.body))}`, // Cuerpo de la solicitud
        `Status Response: ${res.statusCode}`, // Estado de la respuesta
        `Response Time: ${responseTime.toFixed(2)} ms` // Tiempo de respuesta
      ].join('; ') + ";";

      this.logger.log(logMessage);

    });

    next();
  }
}
