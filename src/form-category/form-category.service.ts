import { Injectable } from '@nestjs/common';
import { CreateFormCategoryDto } from './dto/create-form-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FormCategory } from './entities/form-category.entity';

@Injectable()
export class FormCategoryService {
  constructor(
    @InjectRepository(FormCategory)
    private readonly formCategoryService: Repository<FormCategory>,
  ) {}

  async createOne(createFormCategoryDto: CreateFormCategoryDto) {
    await this.formCategoryService.save(createFormCategoryDto);
  }
}
