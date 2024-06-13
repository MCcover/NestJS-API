import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Environment } from './config/environment/environment';
import helmet from 'helmet';

require('dotenv').config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.enableCors();

  app.use(helmet());

  const config = new DocumentBuilder()
    .setTitle('Coleccionalo Ya')
    .setDescription('Coleccionalo Ya API')
    .setVersion(Environment.Instance.VERSION)
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Please insert JWT with Bearer into field.</br>Example: Bearer {JWT}',
        in: 'header'
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
