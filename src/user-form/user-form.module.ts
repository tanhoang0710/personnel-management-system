import { Module } from '@nestjs/common';
import { UserFormController } from './user-form.controller';
import { UserFormService } from './user-form.service';

@Module({
  controllers: [UserFormController],
  providers: [UserFormService]
})
export class UserFormModule {}
