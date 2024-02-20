import { Controller, Get, UnauthorizedException, Request, ValidationPipe, UsePipes, UseFilters } from '@nestjs/common';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { InnovationService } from './innovation.service';
import { CreateInnovationDto } from './dto/create-innovation.dto';
import { UpdateInnovationDto } from './dto/update-innovation.dto';
import { rpcExceptionFilter } from 'src/exceptionFilter/rpc-exception.filter';

@Controller()
export class InnovationController {
  constructor(private readonly innovationService: InnovationService) { }
  
  @MessagePattern({ cmd: 'create_innovation' })
  @UseFilters(new rpcExceptionFilter())
  async create(@Payload() innovationData: {createInnovationDto:CreateInnovationDto, userId:number}) {
    try {
      let created = await this.innovationService.createInnovation(innovationData);
      if(created instanceof Error){
        console.log("error controller");
        throw new Error("missing column")
      }
      return created

    } catch (error) {
      // console.log(error);
      
      return {message:"missing Column"}
    }

  }

  @MessagePattern({ cmd: "get_innovation" })
  findAll() {
    console.log("controller innovation");

    return this.innovationService.findAll();
  }

  @MessagePattern('findOneInnovation')
  findOne(@Payload() id: number) {
    return this.innovationService.findOne(id);
  }

  @MessagePattern({cmd:'edit_innovation'})
  update(@Payload() innovationData: {updateInnovationDto: UpdateInnovationDto, innovationId:number}) {
    return this.innovationService.update(innovationData);
  }

  @MessagePattern({cmd:'softdel_innovation'})
  softDel(@Payload() innovationId:number){
    return this.innovationService.softDel(innovationId)
  }
  remove(@Payload() id: number) {
    return this.innovationService.remove(id);
  }

  @MessagePattern({ cmd: "test_innovation" })
  testInnovation() {
    return this.innovationService.testInnovation()
  }

  @Get(":id")
  async findById(@Request() request:any){
    try {
      return await this.innovationService.findOne(request.params.id)
    } catch (error) {
      return error
    }
  }
}
