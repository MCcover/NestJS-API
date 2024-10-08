import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Environment } from '@config/environment/environment';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { ErrorValidationPipe } from '@pipes/errorValidation/errorValidation.pipe';
import { ResponseInterceptor } from '@interceptors/response/response.interceptor';
import { ErrorFilter } from './filters/error/error.filter';


require('dotenv').config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.useGlobalFilters(new ErrorFilter());
  app.useGlobalInterceptors(new ResponseInterceptor());

  app.useGlobalPipes(
    new ErrorValidationPipe({
      transform: true,
      whitelist: true,
      dismissDefaultMessages: false,
    }),
  );

  app.enableCors({
    credentials: true,
  });

  app.use(cookieParser());

  app.use(helmet());

  const config = new DocumentBuilder()
    .setTitle('Coleccionalo Ya API')
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
    console.log(`http://localhost:${Environment.Instance.PORT}/api/swagger`);
  });

}
bootstrap();
