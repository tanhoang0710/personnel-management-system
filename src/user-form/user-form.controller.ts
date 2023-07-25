import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserFormService } from './user-form.service';
import { ApiBearerAuth, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ROLES } from 'src/common/enums/roles.enum';
import { PERMISSIONS } from 'src/common/enums/permissions.enum';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Permissions } from 'src/common/decorators/permission.decorator';
import { PermissionsGuard } from 'src/common/guards/permissions.guard';
import { JwtAccessTokenGuard } from 'src/auth/guards/jwtAccessToken.guard';
import { CreateUserFormDto } from './dto/create-user-form.dto';
import { Pagination } from 'nestjs-typeorm-paginate';
import { UserForm } from './entities/user-form.entity';
import { GetCurrentUserId } from 'src/common/decorators/get-current-user-id.decorator';
import { UserIsUserOrHrOrManagerOfThatUserGuard } from 'src/common/guards/userIsUserOrHrOrMangerOfThatUser.guard';
import { UpdateUserFormByManagerDto } from './dto/update-user-form-by-manager.dto';
import { UpdateUserFormByEmployeeDto } from './dto/update-user-form-by-employee.dto';
import { UserIsUserFormOwnerGuard } from 'src/common/guards/userIsUserFormOwner.guard';
import { UpdateUserFormByHrDto } from './dto/update-user-form-by-hr.dto';

@Controller('user-forms')
@ApiTags('user-forms')
export class UserFormController {
  constructor(private readonly userFormService: UserFormService) {}

  @Post()
  @Roles(ROLES.ADMIN, ROLES.DIRECTOR, ROLES.HR)
  @Permissions(PERMISSIONS.WRITE)
  @UseGuards(PermissionsGuard)
  @UseGuards(JwtAccessTokenGuard)
  @ApiBearerAuth('access-token')
  async createUserForm(@Body() createUserForm: CreateUserFormDto) {
    return await this.userFormService.createOne(createUserForm);
  }

  @Get()
  // User chỉ xem được form của bản thân
  // và của nhân viên cấp dưới mà user đó trực tiếp quản lý
  // (trừ trường hợp nếu là HR sẽ xem được form của tất cả users)
  @Roles(ROLES.HR, ROLES.MANAGER, ROLES.EMPLOYEE)
  @Permissions(PERMISSIONS.READ)
  @UseGuards(PermissionsGuard)
  @UseGuards(JwtAccessTokenGuard)
  @ApiBearerAuth('access-token')
  @ApiQuery({
    name: 'page',
    required: false,
    example: 1,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    example: 10,
  })
  async getAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
    @GetCurrentUserId() userId: number,
  ): Promise<Pagination<UserForm>> {
    limit = limit > 100 ? 100 : limit;
    return await this.userFormService.getAllPageable(userId, {
      limit,
      page,
      route: 'http://localhost:3000/api-docs/user-forms',
    });
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    example: 1,
  })
  @Roles(ROLES.HR, ROLES.MANAGER, ROLES.EMPLOYEE)
  @Permissions(PERMISSIONS.READ)
  @UseGuards(UserIsUserOrHrOrManagerOfThatUserGuard)
  @UseGuards(JwtAccessTokenGuard)
  @ApiBearerAuth('access-token')
  async getOneUserForm(@Param('id', ParseIntPipe) id: number) {
    return await this.userFormService.getOne(id);
  }

  @Put(':id/manager-update')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Roles(ROLES.HR)
  @Permissions(PERMISSIONS.UPDATE)
  @UseGuards(UserIsUserOrHrOrManagerOfThatUserGuard)
  @UseGuards(PermissionsGuard)
  @UseGuards(JwtAccessTokenGuard)
  @ApiBearerAuth('access-token')
  @ApiParam({
    name: 'id',
    example: 1,
  })
  async updateByManager(
    @Body() updateUserFormByManagerDto: UpdateUserFormByManagerDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return await this.userFormService.updateOne(id, updateUserFormByManagerDto);
  }

  @Put(':id/hr-update')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Roles(ROLES.HR)
  @Permissions(PERMISSIONS.UPDATE)
  @UseGuards(UserIsUserOrHrOrManagerOfThatUserGuard)
  @UseGuards(PermissionsGuard)
  @UseGuards(JwtAccessTokenGuard)
  @ApiBearerAuth('access-token')
  @ApiParam({
    name: 'id',
    example: 1,
  })
  async updateByHr(
    @Body() updateUserFormByHrDto: UpdateUserFormByHrDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return await this.userFormService.updateOne(id, updateUserFormByHrDto);
  }

  @Put(':id/employee-update')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Roles(ROLES.EMPLOYEE)
  @Permissions(PERMISSIONS.UPDATE)
  @UseGuards(UserIsUserFormOwnerGuard)
  @UseGuards(PermissionsGuard)
  @UseGuards(JwtAccessTokenGuard)
  @ApiBearerAuth('access-token')
  @ApiParam({
    name: 'id',
    example: 1,
  })
  async updateByUser(
    @Body() updateUserFormByEmployeeDto: UpdateUserFormByEmployeeDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return await this.userFormService.updateOne(
      id,
      updateUserFormByEmployeeDto,
    );
  }
}
