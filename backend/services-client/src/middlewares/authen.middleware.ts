import { Controller, Inject, Injectable, NestMiddleware, UnauthorizedException } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { Request, Response, NextFunction } from "express";
import { AuthenticationService } from "./authen.service";
import { AppService } from "src/app.service";
import { UserService } from "src/user/user.service";
import axios from "axios";


interface User {
    userId: string;
    email: string;
}

declare global {
    namespace Express {
        interface Request {
            user: User;
        }
    }
}
@Injectable()
export class Authentication implements NestMiddleware {
    constructor(
        // @Inject("USER_MICROSERVICE") private readonly user_client:ClientProxy,
        //  private readonly app_service :AppService    
        private readonly user_service: UserService
    ) { }

    async use(req: Request, res: Response, next: NextFunction) {
        try {

            // console.log("test authen")
            // console.log(req.headers);

            //    let response = await this.user_service.findAll()
            if (!req.headers.access_token) {
                throw new Error("invalid token")
            }
            let { data } = await axios.get("http://localhost:4001/users/verify", {
                headers: {
                    access_token: req.headers.access_token
                }
            })

            req.user = { userId: data.userId, email: data.email } as User

            // console.log(data)
            // console.log(req.user);

            console.log("test authen middleware");

            if (!data) {
                throw new Error("invalid token")
            }
            next()
        } catch (error) {
            console.log("error");

            throw new UnauthorizedException()
        }
    }
}