import {
  Controller,
  DefaultValuePipe,
  Get,
  ParseIntPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ReportService } from './report.service';
import { FORM_CATEGORIES } from 'src/common/enums/formCategories.enum';
import { Roles } from 'src/common/decorators/roles.decorator';
import { ROLES } from 'src/common/enums/roles.enum';
import { PERMISSIONS } from 'src/common/enums/permissions.enum';
import { PermissionsGuard } from 'src/common/guards/permissions.guard';
import { JwtAccessTokenGuard } from 'src/auth/guards/jwtAccessToken.guard';
import { Permissions } from 'src/common/decorators/permission.decorator';

@Controller('reports')
@ApiTags('reports')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get('user-have-incomplete-form')
  @Roles(ROLES.HR, ROLES.ADMIN, ROLES.DIRECTOR)
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
  @ApiQuery({
    name: 'type',
    required: false,
    enum: FORM_CATEGORIES,
    example: FORM_CATEGORIES.EVALUATION_FORM,
  })
  async getAllReport(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
    @Query('type', new DefaultValuePipe(FORM_CATEGORIES.EVALUATION_FORM))
    type: FORM_CATEGORIES,
  ) {
    limit = limit > 100 ? 100 : limit;

    return await this.reportService.getUserGotIncompleteForm(type, {
      limit,
      page,
      route: `http://localhost:3000/reports/user-have-incomplete-form?type=${type}`,
    });
  }
}
