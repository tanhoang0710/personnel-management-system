import { Module } from '@nestjs/common';
import { FormService } from './form.service';
import { FormController } from './form.controller';
import { UserModule } from 'src/user/user.module';
import { AccessControllModule } from 'src/access-controll/access-controll.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Form } from './entities/form.entity';
import { MailModule } from 'src/mail/mail.module';

@Module({
  imports: [
    UserModule,
    AccessControllModule,
    TypeOrmModule.forFeature([Form]),
    MailModule,
  ],
  providers: [FormService],
  controllers: [FormController],
  exports: [FormService],
})
export class FormModule {}
