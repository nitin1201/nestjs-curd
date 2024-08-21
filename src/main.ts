import { NestFactory } from '@nestjs/core';
import { appModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(appModule);
  await app.listen(4100);
}
bootstrap();
