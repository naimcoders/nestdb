import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationFilter } from './validation/validation.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  const port = process.env.PORT || 3000;
  app.useGlobalFilters(new ValidationFilter());

  await app.listen(port);
}
bootstrap();
