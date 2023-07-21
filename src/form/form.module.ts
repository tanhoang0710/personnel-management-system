import { Module } from '@nestjs/common';
import { FormService } from './form.service';
import { FormController } from './form.controller';
import { UserModule } from 'src/user/user.module';
import { AccessControllModule } from 'src/access-controll/access-controll.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Form } from './entities/form.entity';

@Module({
  imports: [UserModule, AccessControllModule, TypeOrmModule.forFeature([Form])],
  providers: [FormService],
  controllers: [FormController],
})
export class FormModule {}
