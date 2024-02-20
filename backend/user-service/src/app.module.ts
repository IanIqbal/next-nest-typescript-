import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import {TypeOrmModule} from "@nestjs/typeorm"
import { Config } from './data.source';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { jwtHelperModule } from './helpers/jwtHelper/jwtHelper.module';

@Module({
  imports: [ TypeOrmModule.forRoot(Config) ,
    jwtHelperModule,
    UserModule, 
    ConfigModule.forRoot(),
    JwtModule.register({
      global:true,
      secret:process.env.SECRET
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
