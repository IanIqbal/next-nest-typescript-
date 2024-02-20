import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InnovationModule } from './innovation/innovation.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Innovation } from './innovation/entities/innovation.entity';
import { Team } from './innovation/entities/team.entity';
import { Config } from './data-source';

@Module({
  imports: [TypeOrmModule.forRoot(Config),InnovationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
