import { CanActivate, ExecutionContext, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import axios from 'axios';
import {  Observable } from 'rxjs';

@Injectable()
export class AuthorGuard implements CanActivate {
  async canActivate(
    context: ExecutionContext,
  ):  Promise<boolean> {
    try {
      let request = context.switchToHttp().getRequest()
      
      // console.log(request);
      let {data} = await axios.get("http://localhost:4002/" + request.params.id)
      console.log(data);
      if(!data){
        console.log("validatin>>>>>>>>>>>");
        
        throw new  NotFoundException()
      }
      let foundersRole = data.teams.filter((el:any) => el.teamRole == "founder")
      
      // console.log(foundersRole);
      
      if(foundersRole[0].userId != request.user.userId){
        throw new Error()
      }
    } catch (error) {
      if(error.message = "Not Found"){
        throw new NotFoundException()
      }
      throw new ForbiddenException()
    }
    return true;
  }
}
