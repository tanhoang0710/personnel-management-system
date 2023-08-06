import { Module } from '@nestjs/common';
import { ReportController } from './report.controller';
import { ReportService } from './report.service';
import { FormModule } from 'src/form/form.module';
import { Form } from 'src/form/entities/form.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserForm } from 'src/user-form/entities/user-form.entity';
import { User } from 'src/user/entities/user.entity';
import { UserModule } from 'src/user/user.module';
import { AccessControllModule } from 'src/access-controll/access-controll.module';

@Module({
  imports: [
    FormModule,
    TypeOrmModule.forFeature([Form, UserForm, User]),
    UserModule,
    AccessControllModule,
  ],
  controllers: [ReportController],
  providers: [ReportService],
})
export class ReportModule {}
