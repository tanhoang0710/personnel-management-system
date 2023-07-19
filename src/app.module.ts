import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfigAsync } from './config/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { PermissionModule } from './permission/permission.module';
import { AccessControllModule } from './access-controll/access-controll.module';
import { UserFormModule } from './user-form/user-form.module';
import { FormModule } from './form/form.module';
import { FormCategoryModule } from './form-category/form-category.module';
import { UserFormDetailModule } from './user-form-detail/user-form-detail.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync(typeOrmConfigAsync),
    AuthModule,
    UserModule,
    RoleModule,
    PermissionModule,
    AccessControllModule,
    UserFormModule,
    FormModule,
    FormCategoryModule,
    UserFormDetailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
