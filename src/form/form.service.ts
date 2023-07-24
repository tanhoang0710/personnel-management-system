import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Form } from './entities/form.entity';
import { Repository } from 'typeorm';
import { CreateFormDto } from './dto/create-form.dto';

@Injectable()
export class FormService {
  constructor(
    @InjectRepository(Form)
    private readonly formRepository: Repository<Form>,
  ) {}

  async createOne(createFromDto: CreateFormDto) {
    try {
      const newForm = await this.formRepository.save({
        ...createFromDto,
        formCategory: {
          id: createFromDto.formCategoryId,
        },
      });

      return newForm;
    } catch (error) {
      return new BadRequestException(error.message);
    }
  }
}
