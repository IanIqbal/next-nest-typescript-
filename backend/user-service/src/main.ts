import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices'
import { AppModule } from './app.module';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule)    // console.log(app);
   app.connectMicroservice<MicroserviceOptions>({
      transport: Transport.TCP,
      options: {
        port: 3001,
      },
    });
    await app.startAllMicroservices()
    await app.listen(4001);
  } catch (error) {
    console.log(error);
  }
}
bootstrap();
