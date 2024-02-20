import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";

@Injectable()
export class AuthenticationService{
    constructor(
        @Inject("USER_MICROSERVICE") private readonly user_client: ClientProxy
    ){}

   async authenticateUser(){
        console.log("service middleware");
        
    }
}