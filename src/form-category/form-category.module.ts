import { Module } from '@nestjs/common';
import { FormCategoryController } from './form-category.controller';
import { FormCategoryService } from './form-category.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormCategory } from './entities/form-category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FormCategory])],
  controllers: [FormCategoryController],
  providers: [FormCategoryService],
})
export class FormCategoryModule {}
