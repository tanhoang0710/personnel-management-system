import { Module } from '@nestjs/common';
import { UserFormDetailController } from './user-form-detail.controller';
import { UserFormDetailService } from './user-form-detail.service';

@Module({
  controllers: [UserFormDetailController],
  providers: [UserFormDetailService]
})
export class UserFormDetailModule {}
