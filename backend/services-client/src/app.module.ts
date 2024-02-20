import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { InnovationModule } from './innovation/innovation.module';
import { Authentication } from './middlewares/authen.middleware';
import { InnovationController } from './innovation/innovation.controller';
import { AuthenticationModule } from './middlewares/authen.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';

@Module({
  imports: [UserModule, InnovationModule, AuthenticationModule,ClientsModule.register([
    {
        name: "USER_MICROSERVICE",
        transport: Transport.TCP,
        options: {
            port: 3001
        }
    }
])],
  controllers: [AppController],
  providers: [AppService, UserService],
})
export class AppModule {

}
