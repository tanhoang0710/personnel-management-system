import { Module } from '@nestjs/common';
import { FormCategoryController } from './form-category.controller';
import { FormCategoryService } from './form-category.service';

@Module({
  controllers: [FormCategoryController],
  providers: [FormCategoryService]
})
export class FormCategoryModule {}
