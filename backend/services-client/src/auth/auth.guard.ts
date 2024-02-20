import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import axios from 'axios';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
  ) { }
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    try {

      let request = context.switchToHttp().getRequest()
      // console.log(request.headers.access_token);
      
      if (!request.headers.access_token) {
        throw new Error("invalid token")
      }

      let {data} = await axios.get("http://localhost:4001/users/verify", {
        headers:
          {access_token: request.headers.access_token}
      })

      if(data.message == "Unauthorized"){
        throw new Error()
      }
      
      request['user'] = data
      // console.log(request.user);
      
    } catch (error) {
      throw new UnauthorizedException()
    }
    return true;
  }
}
