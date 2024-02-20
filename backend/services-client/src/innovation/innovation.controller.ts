import { Body, Controller, Get, Inject, Injectable, Patch, Post, Put, Req, Request, UseFilters, UseGuards } from '@nestjs/common';
import { InnovationService } from './innovation.service';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { AuthGuard } from 'src/auth/auth.guard';
import { User } from './innovation.decorator';
import { AuthorGuard } from 'src/author/author.guard';
import { RpcExceptionToHttpExceptionFilter } from 'src/rpc-exception/rpc-exception.filter';
import { catchError, throwError } from 'rxjs';
import { CreateInnovationDto } from './dto/create-innovation.dto';
import { UpdateInnovationDto } from './dto/update-innovation.dto';

@Controller("innovations")

export class InnovationController {
  constructor(
    private readonly innovationService: InnovationService,
    @Inject("INNOVATION_MICROSERVICE") private readonly innovation_client:ClientProxy,
    ) {}
    
    @Post()
    @UseGuards(AuthGuard)
   async  createInnovation(@Request() request : any, @Body() createInnovationDto: CreateInnovationDto ) {
      // let {user}= request.
      try {
        
        console.log(request.user);
        
        let userId  = request.user.userId
        let created =  this.innovation_client.send({cmd:"create_innovation"}, {createInnovationDto, userId}).pipe(catchError(error => throwError(() => {
          // console.log(error);
          
          return new RpcException(error[0])
        } )))

        if(created instanceof Error){          
          throw new Error("missing column")
        }


        
        return created
      } catch (error) {
        
        return new Error("missing column")
      }
      // return this.request.user
    }

    @Get()
    @UseGuards(AuthGuard)
    async getInnovations(){
      try {
        console.log("innovation controlelr");
        
        return this.innovation_client.send({cmd:"get_innovation"}, {data:null})
      } catch (error) {
        console.log(error);
        
      }
    }

    @Put(":id")
    @UseGuards(AuthGuard, AuthorGuard)
    async editInnovation(@Request() req:any,@Body() updateInnovationDto:UpdateInnovationDto){
      console.log("test");
      console.log(req.params);
      
      return  this.innovation_client.send({cmd:"edit_innovation"}, {updateInnovationDto, innovationId:req.params.id})
    }
    @Get("test_innovation")
    testInnovation(){
      return "test"
      // return this.innovation_client.send({cmd:"test_innovation"},{data:null})
    }

    @Patch(":id")
    @UseGuards(AuthGuard,AuthorGuard)
    async softDelInnovation(@Request() req:any){
      return this.innovation_client.send({cmd:"softdel_innovation"}, req.params.id)
    }
}
