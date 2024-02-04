import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ZodExceptionFilter } from './utils/ZodExceptionFilter';
import * as cookieParser from 'cookie-parser';
import { S3Client } from '@aws-sdk/client-s3';
import 'dotenv/config';

export const s3 = new S3Client({
  region: process.env.BUCKET_REGION,
  credentials: {
    accessKeyId: process.env.BUCKET_ACCESS_KEY,
    secretAccessKey: process.env.BUCKET_SECRET_ACCESS_KEY,
  },
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.enableCors({
    origin: ['http://localhost:5173', 'https://checkout.stripe.com'],
    credentials: true,
  });
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new ZodExceptionFilter(httpAdapter));
  await app.listen(3000);
}
bootstrap();
