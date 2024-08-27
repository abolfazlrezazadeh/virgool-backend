import { NestFactory } from '@nestjs/core';
import { swaggerConfig } from './config/swagger.config';
import { AppModule } from './modules/app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  swaggerConfig(app)
  const { PORT } = process.env
  await app.listen(PORT, () => {
    console.log(`api: http://localhost:${PORT}`)
    console.log(`swagger: http://localhost:${PORT}/swagger`)

  }
  );
}
bootstrap();
