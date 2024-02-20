import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class UserService {
  constructor(@Inject("USER_MICROSERVICE") private readonly user_client:ClientProxy ){}
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

 async findAll() {
  console.log("findall service");
    
    return  this.user_client.send({cmd:"find_all_user"},{data:null});
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
