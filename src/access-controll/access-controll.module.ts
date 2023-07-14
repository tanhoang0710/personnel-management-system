import { Module } from '@nestjs/common';
import { AccessControllService } from './access-controll.service';
import { AccessControllController } from './access-controll.controller';

@Module({
  providers: [AccessControllService],
  controllers: [AccessControllController]
})
export class AccessControllModule {}
