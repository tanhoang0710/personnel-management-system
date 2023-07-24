import { Module } from '@nestjs/common';
import { UserFormController } from './user-form.controller';
import { UserFormService } from './user-form.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserForm } from './entities/user-form.entity';
import { AccessControllModule } from 'src/access-controll/access-controll.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserForm]),
    UserModule,
    AccessControllModule,
  ],
  controllers: [UserFormController],
  providers: [UserFormService],
})
export class UserFormModule {}
