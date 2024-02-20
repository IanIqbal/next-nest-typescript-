import { Controller, Get, Post, Req, UnauthorizedException } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { hashPassword } from 'src/helpers/bcryptHelper';
import { get } from 'https';
import { Request } from 'express';
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @MessagePattern({ cmd: 'register_user' })
  async registerUser(@Payload() message: User): Promise<User> {
    const hashedPassword = await hashPassword(message.password)

    const bodyData: any = {
      fullname: message.fullname,
      email: message.email,
      password: hashedPassword,
      employeeNumber: message.employeeNumber
    };
    return await this.userService.create(bodyData);
  }
  @MessagePattern({ cmd: "login_user" })
  async loginUser(@Payload() message: User): Promise<any> {
    try {
      let user = await this.userService.login(message)
      if (user instanceof Error) {
        throw new Error(user.message)
      }

      return user
    } catch (error) {
      if (error.message == "incorrect email or password") {
        return new UnauthorizedException(error.message)
      } else {
        return new Error(error.message)
      }
    }
  }
  // @MessagePattern('createUser')
  // create(@Payload() createUserDto: CreateUserDto) {
  //   return this.userService.create(createUserDto);
  // }

  @Get("verify")
  // @MessagePattern({cmd:'find_all_user'})
  async checkUser(@Req() request: Request) {
    try {

      console.log("verify controller")
      console.log(request.headers)
      let access_token = request.headers.access_token ?? ''
      let verificationResult = await this.userService.verifyUser({ access_token: access_token as string });
      return verificationResult
    } catch (error) {
      throw Error("invalid token")
    }
  }

  // @MessagePattern('findOneUser')
  // findOne(@Payload() id: number) {
  //   return this.userService.findOne(id);
  // }

  // @MessagePattern('updateUser')
  // update(@Payload() updateUserDto: UpdateUserDto) {
  //   return this.userService.update(updateUserDto.id, updateUserDto);
  // }

  // @MessagePattern('removeUser')
  // remove(@Payload() id: number) {
  //   return this.userService.remove(id);
  // }
}
