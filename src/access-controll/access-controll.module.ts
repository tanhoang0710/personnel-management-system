import { Module } from '@nestjs/common';
import { AccessControllService } from './access-controll.service';
import { AccessControllController } from './access-controll.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccessControll } from './entities/access-controll.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AccessControll])],
  providers: [AccessControllService],
  controllers: [AccessControllController],
  exports: [AccessControllService],
})
export class AccessControllModule {}
