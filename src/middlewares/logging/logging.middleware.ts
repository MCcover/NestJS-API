import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import dateToString from 'src/utils/date/date.utils';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  private readonly logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction): void {
    const startAt = process.hrtime();
    res.on('finish', () => {
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
        `Body: ${JSON.stringify(req.body)}`, // Cuerpo de la solicitud
        `Status Response: ${res.statusCode}`, // Estado de la respuesta
        `Response Time: ${responseTime.toFixed(2)} ms` // Tiempo de respuesta
      ].join('; ') + ";";

      this.logger.log(logMessage);
    });

    next();
  }
}
