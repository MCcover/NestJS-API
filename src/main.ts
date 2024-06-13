import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Environment } from './config/environment/environment';
import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

require('dotenv').config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  app.enableCors({
    credentials: true,
  });

  app.use(cookieParser());

  app.use(helmet());

  const config = new DocumentBuilder()
    .setTitle('My API')
    .setDescription('My API Description')
    .setVersion(Environment.Instance.VERSION)
    .addBearerAuth(
      {
        type: 'http',
        in: 'cookie',
        name: 'JWT',
        scheme: 'Bearer',
        bearerFormat: 'JWT',
        description: 'Please insert JWT with Bearer into field.</br>Example: Bearer {JWT}',
        // type: 'http',
        // scheme: 'bearer',
        // bearerFormat: 'JWT',
        // name: 'JWT',
        // in: 'cookie'
      },
      'Bearear Authentication'
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/swagger', app, document);

  await app.listen(Environment.Instance.PORT, () => {
    console.log(`http://localhost:${Environment.Instance.PORT}/api`);
  });

}
bootstrap();
