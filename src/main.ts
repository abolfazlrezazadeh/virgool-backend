import { NestFactory } from '@nestjs/core';
import { swaggerConfig } from './config/swagger.config';
import { AppModule } from './modules/app/app.module';
import * as cookieParser from 'cookie-parser';
import { json, urlencoded } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  swaggerConfig(app)
  const { PORT,COOKIE_SECRET } = process.env
  app.use(cookieParser(COOKIE_SECRET));
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));
  await app.listen(PORT, () => {
    console.log(`api: http://localhost:${PORT}`)
    console.log(`swagger: http://localhost:${PORT}/swagger`)

  }
  );
}
bootstrap();
