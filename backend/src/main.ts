import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

const DEFAULT_PORT = 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Activer CORS pour permettre les appels depuis le frontend
  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:8000',
    credentials: true,
  });

  // Préfixe global pour toutes les routes
  app.setGlobalPrefix('api');

  // Validation automatique des DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  await app.listen(process.env.PORT ?? DEFAULT_PORT);
  console.log(`🚀 Backend API running on: http://localhost:${process.env.PORT ?? DEFAULT_PORT}/api`);
}
bootstrap();
