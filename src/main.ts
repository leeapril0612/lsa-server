import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import https from 'https';
import {readFileSync} from 'fs';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  
  const httpsOptions = {
    key: readFileSync('./cert/localhost.dev.key'),
    cert: readFileSync('./cert/localhost.dev.crt'),
  };
  const app = await NestFactory.create(AppModule, {
    httpsOptions: httpsOptions
  });
  app.use(cookieParser());
  app.enableCors({
    credentials: true,
    origin: true,
  });
  await app.listen(3080);
}
bootstrap();

