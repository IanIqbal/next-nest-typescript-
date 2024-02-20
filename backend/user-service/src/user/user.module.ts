import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { jwtHelperModule } from 'src/helpers/jwtHelper/jwtHelper.module';
import { Team } from './entities/team.entity';
@Module({
  imports:[TypeOrmModule.forFeature([User, Team]), jwtHelperModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
