import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class jwtHelperService {
    constructor(private readonly jwtService: JwtService) { }

     async jwtSign (payload: { userId: number, email: string }): Promise<string> {
        console.log(process.env.SECRET);

        const signedPayload = await this.jwtService.signAsync(payload)

        return signedPayload
    }

    async jwtVerify (payload: {access_token: string}){
        try {
            // console.log(payload.access_token);
            
            let result =  await this.jwtService.verifyAsync(payload.access_token, {
                secret:process.env.SECRET
            })
             return result
            
        } catch (error) {
            // console.log(error, "<<<<jwthelper");
            return error
        }   
    }
} 