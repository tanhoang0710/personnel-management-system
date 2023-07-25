import { Module } from '@nestjs/common';
import { UserFormDetailController } from './user-form-detail.controller';
import { UserFormDetailService } from './user-form-detail.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserFormDetail } from './entities/user-form-detail.entity';
import { UserModule } from 'src/user/user.module';
import { AccessControllModule } from 'src/access-controll/access-controll.module';
import { UserFormModule } from 'src/user-form/user-form.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserFormDetail]),
    UserModule,
    AccessControllModule,
    UserFormModule,
  ],
  controllers: [UserFormDetailController],
  providers: [UserFormDetailService],
})
export class UserFormDetailModule {}
