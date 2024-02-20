import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, RpcException, Transport } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';
import { rpcExceptionFilter } from './exceptionFilter/rpc-exception.filter';
const portMicro = 3002
const portHttp = 4002
async function bootstrap() {
  try {

    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe(
      {
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
        forbidUnknownValues: true,
        disableErrorMessages: true,
        exceptionFactory: (errors) => {
           return new RpcException(errors);
        }
      }
    ))
    // app.useGlobalFilters(new rpcExceptionFilter())
    app.connectMicroservice<MicroserviceOptions>({
      transport: Transport.TCP,
      options: {
        port: portMicro
      }
    },
    { inheritAppConfig: true },)
    
    await app.startAllMicroservices()
    await app.listen(portHttp);
    console.log("innovation-service: \nhttp run on port " + portHttp  + "\n" + 
                "TCP run on port " + portMicro  );
    
  } catch (error) {
    console.log(error);
    
  }
}
bootstrap();
