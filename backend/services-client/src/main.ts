import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { RpcExceptionToHttpExceptionFilter } from './rpc-exception/rpc-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

   app.useGlobalFilters(new RpcExceptionToHttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe())
  
  await app.listen(3000);
}
bootstrap();
