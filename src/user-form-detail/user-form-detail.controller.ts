import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { UserFormDetailService } from './user-form-detail.service';
import { CreateUserFormDetailDto } from './dto/create-user-form-detail.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAccessTokenGuard } from 'src/auth/guards/jwtAccessToken.guard';
import { PERMISSIONS } from 'src/common/enums/permissions.enum';
import { Permissions } from 'src/common/decorators/permission.decorator';
import { Roles } from 'src/common/decorators/roles.decorator';
import { ROLES } from 'src/common/enums/roles.enum';
import { UserIsUserFormOwnerGuard } from 'src/common/guards/userIsUserFormOwner.guard';
import { PermissionsGuard } from 'src/common/guards/permissions.guard';

@Controller('user-form-details')
@ApiTags('user-form-details')
export class UserFormDetailController {
  constructor(private readonly userFormDetailService: UserFormDetailService) {}

  // Employee save form
  @Post()
  @Roles(ROLES.EMPLOYEE, ROLES.MANAGER)
  @Permissions(PERMISSIONS.UPDATE)
  @UseGuards(UserIsUserFormOwnerGuard)
  @UseGuards(PermissionsGuard)
  @UseGuards(JwtAccessTokenGuard)
  @ApiBearerAuth('access-token')
  async createUserFormDetail(
    @Body() createUserFormDetailDto: CreateUserFormDetailDto,
  ) {
    return await this.userFormDetailService.createOne(createUserFormDetailDto);
  }
}
