import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from "@nestjs/common";
import helmet from "helmet";
import { getCorsConfig } from "./framework/cors/CorsConfig";
import * as compression from 'compression';

async function bootstrap() {
  const lApp = await NestFactory.create(AppModule);
  lApp.useGlobalPipes(new ValidationPipe());

  //Security
  lApp.use(helmet())
  lApp.enableCors(getCorsConfig())

  //Compress
  lApp.use(compression())

  await lApp.listen(process.env.PORT_APPLICATION);
}
bootstrap();
