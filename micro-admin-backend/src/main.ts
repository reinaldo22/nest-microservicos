import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv'
dotenv.config()


const logger = new Logger('Main')

async function bootstrap() {

  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBIT_CONECCION],
      noAck: false,
      queue: 'admin-backend'
    },
  });
  await app.listen();
}
bootstrap();
