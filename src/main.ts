import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableVersioning({
    defaultVersion: '1',
    type: VersioningType.URI,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //removes all properties of a request’s body which are not in the DTO
      transform: true, //automatically transform payloads to be objects typed according to their DTO classes
    }),
  );
  app.enableCors();
  setupSwagger(app);
  await app.listen(3000);
}
bootstrap();
