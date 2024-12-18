import { NestFactory } from '@nestjs/core';
import { swaggerConfig } from './config/swagger.config';
import { AppModule } from './modules/app/app.module';
import * as cookieParser from 'cookie-parser';
import { json, urlencoded } from 'express';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  swaggerConfig(app)
  const { PORT,COOKIE_SECRET } = process.env
  app.useStaticAssets('public')
  app.useGlobalPipes(new ValidationPipe())
  app.use(cookieParser(COOKIE_SECRET));
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));
  // await app.listen(PORT, () => {
  //   console.log(`api: http://localhost:${PORT}`)
  //   console.log(`swagger: http://localhost:${PORT}/swagger`)

  // }
  await app.listen(PORT,"0.0.0.0", () => {
    console.log(`api: http://localhost:${PORT}`)
    console.log(`swagger: http://localhost:${PORT}/swagger`)
  }
  );
}
bootstrap();
