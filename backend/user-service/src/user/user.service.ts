import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { comparePassword } from 'src/helpers/bcryptHelper';
import { jwtHelperService } from 'src/helpers/jwtHelper/jwtHelper.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwt:jwtHelperService
  ) {}
  async create(createUserDto: CreateUserDto) {
    console.log(createUserDto)
    return await this.userRepository.save(createUserDto);
  }

  async login(userData: {email:string, password:string}){
    try {
      const {email, password} = userData
      // console.log(email);
      
      let user = await this.userRepository.findOneBy({email})
      // console.log(user);
      if(!user){
        throw new Error("incorrect email or password")
      }
      let result = user? await comparePassword(password, user.password) : ""
      if(!result){
        throw new Error("incorrect email or password")
      }
      console.log(result);
      
      let signedPayload = user? await this.jwt.jwtSign({userId:user?.id,email:user.email }) : ""
      // console.log(signedPayload);
      
      return {access_token:signedPayload}
      
    } catch (error) {
      return new Error("incorrect email or password")
    }
  }
  // create(createUserDto: CreateUserDto) {
  //   return 'This action adds a new user';
  // }

  async findAll() {
    console.log("findall function");
    
    return await this.userRepository.find()
  }

  async verifyUser(payload:{access_token:string}){
    try {
      // console.log(payload, "user service");
      
      let verify = await this.jwt.jwtVerify(payload)
      // console.log(verify);
      if(verify instanceof Error){
        // console.log(verify, "<<<user service");
        throw new Error(verify.message)
      }
      let checkUser = await this.userRepository.findOneBy({
        id:verify.userId,
        email:verify.email
      })

      // console.log(checkUser);
      
      if (checkUser != undefined){
        return {userId:checkUser.id, email:checkUser.email}
      }
      // console.log(checkUser);
      
      throw new Error()
    } catch (error) {
      console.log(error.message, "<<<<catch error");
      
      return new UnauthorizedException()
      // console.log(error);
    }
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} user`;
  // }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
