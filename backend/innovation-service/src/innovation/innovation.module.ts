import { Module } from '@nestjs/common';
import { InnovationService } from './innovation.service';
import { InnovationController } from './innovation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Innovation } from './entities/innovation.entity';
import { Team } from './entities/team.entity';
import { User } from './entities/user.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Innovation,Team, User])],
  controllers: [InnovationController, ],
  providers: [InnovationService],
})
export class InnovationModule {}
