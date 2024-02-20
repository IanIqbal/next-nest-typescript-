import { Controller, Get, Post, Body, Patch, Param, Delete, Inject } from '@nestjs/common';

import { ClientProxy } from '@nestjs/microservices';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(@Inject('USER_MICROSERVICE') private readonly user_client: ClientProxy,
    private readonly user_service:UserService
  ) { }

  @Post('register_user')
  register(@Body() userData: { fullname: string, employeeNumber: string, email: string, password: string }) {
    const fullname = userData.fullname
    const employeeNumber = userData.employeeNumber
    const email = userData.email
    const password = userData.password
    return this.user_client.send({ cmd: "register_user" }, { fullname, employeeNumber, email, password });
  }

  @Post('login_user')
  async login(@Body() userData: { email: string, password: string }) {
    try {
      const {email, password} = userData
      console.log(userData);
      return await this.user_client.send({cmd:"login_user"}, {email, password})

      
    } catch (error) {
      console.log(error);
    }
  }
  @Get("get_users")
  findAll() {
    return this.user_service.findAll()
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.user_client.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.user_client.update(+id, updateUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.user_client.remove(+id);
  // }
}
