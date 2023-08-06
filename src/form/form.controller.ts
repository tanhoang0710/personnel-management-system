import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { FormService } from './form.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ROLES } from 'src/common/enums/roles.enum';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Permissions } from 'src/common/decorators/permission.decorator';
import { PERMISSIONS } from 'src/common/enums/permissions.enum';
import { JwtAccessTokenGuard } from 'src/auth/guards/jwtAccessToken.guard';
import { CreateFormDto } from './dto/create-form.dto';
import { PermissionsGuard } from 'src/common/guards/permissions.guard';
import { AssignFormForUserDto } from './dto/assign-form-for-user.dto';

@Controller('forms')
@ApiTags('forms')
export class FormController {
  constructor(private readonly formService: FormService) {}

  @Post()
  @Roles(ROLES.ADMIN, ROLES.DIRECTOR, ROLES.HR)
  @Permissions(PERMISSIONS.WRITE)
  @UseGuards(PermissionsGuard)
  @UseGuards(JwtAccessTokenGuard)
  @ApiBearerAuth('access-token')
  async createOne(@Body() createFormDto: CreateFormDto) {
    return await this.formService.createOne(createFormDto);
  }

  @Patch(':id')
  @Roles(ROLES.ADMIN, ROLES.DIRECTOR, ROLES.HR)
  @Permissions(PERMISSIONS.WRITE, PERMISSIONS.UPDATE)
  @UseGuards(PermissionsGuard)
  @UseGuards(JwtAccessTokenGuard)
  @ApiBearerAuth('access-token')
  @HttpCode(HttpStatus.NO_CONTENT)
  async assignForEmployee(
    @Param('id', ParseIntPipe) formId: number,
    @Body() assignFormForUserDto: AssignFormForUserDto,
  ) {
    return await this.formService.assignForEmployee(
      formId,
      assignFormForUserDto.userId,
    );
  }
}
