import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ZodExceptionFilter } from './utils/ZodExceptionFilter';
import * as cookieParser from 'cookie-parser';
import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());

  app.enableCors({
    origin: [
      'http://localhost:5173',
      'https://checkout.stripe.com',
      'https://exquisite-pasca-338883.netlify.app',
    ],
    credentials: true,
  });
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new ZodExceptionFilter(httpAdapter));
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
