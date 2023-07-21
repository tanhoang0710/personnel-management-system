import { Body, Controller, Post } from '@nestjs/common';
import { FormCategoryService } from './form-category.service';
import { CreateFormCategoryDto } from './dto/create-form-category.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('form-categories')
@ApiTags('form-categories')
export class FormCategoryController {
  constructor(private readonly formCategoryService: FormCategoryService) {}

  @Post()
  async createOne(@Body() createFormCategoryDto: CreateFormCategoryDto) {
    await this.formCategoryService.createOne(createFormCategoryDto);
  }
}
