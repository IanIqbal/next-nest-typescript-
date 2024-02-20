import { Module, forwardRef } from '@nestjs/common';
import { InnovationService } from './innovation.service';
import { InnovationController } from './innovation.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/auth/auth.guard';

@Module({
  imports: [ClientsModule.register([{
    name: "INNOVATION_MICROSERVICE",
    transport: Transport.TCP,
    options: {
      port: 3002
    }
  }]),
], 
  controllers: [InnovationController],
  providers: [InnovationService,AuthGuard  ],
})
export class InnovationModule { }
