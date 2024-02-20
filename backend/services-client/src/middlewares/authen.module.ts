import { Module } from "@nestjs/common";
import { Authentication } from "./authen.middleware";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { AuthenticationService } from "./authen.service";

@Module({
    imports: [ClientsModule.register([
        {
            name: "USER_MICROSERVICE",
            transport: Transport.TCP,
            options: {
                port: 3001
            }
        }
    ])],
    controllers: [],
    providers: [AuthenticationService]
})

export class AuthenticationModule { }