import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';
import { FORM_CATEGORIES } from 'src/common/enums/formCategories.enum';
import { STATUS } from 'src/common/enums/status.enum';
import { Form } from 'src/form/entities/form.entity';
import { FormService } from 'src/form/form.service';
import { UserForm } from 'src/user-form/entities/user-form.entity';
import { User } from 'src/user/entities/user.entity';
import { In, Repository } from 'typeorm';

@Injectable()
export class ReportService {
  constructor(
    private readonly formService: FormService,
    @InjectRepository(Form)
    private readonly formRepository: Repository<Form>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(UserForm)
    private readonly userFormRepository: Repository<UserForm>,
  ) {}

  async getUserGotIncompleteForm(
    type: FORM_CATEGORIES,
    options: IPaginationOptions,
  ) {
    switch (type) {
      case FORM_CATEGORIES.PROBATIONARY_FORM:
        const probationForms =
          await this.formService.getAllByTypeAndGreaterThanDueDate(type);

        const userProbationForms = await this.userFormRepository.find({
          where: {
            form: {
              id: In(probationForms.map((form) => form.id)),
            },
            status: STATUS.NEW,
          },
          relations: {
            user: true,
          },
        });

        const userPs = await paginate(this.userRepository, options, {
          where: {
            id: In(userProbationForms.map((form) => form.user.id)),
          },
        });

        return userPs;
      case FORM_CATEGORIES.EVALUATION_FORM:
        const evaluationForms =
          await this.formService.getAllByTypeAndGreaterThanDueDate(type);

        const userForms = await this.userFormRepository.find({
          where: {
            form: {
              id: In(evaluationForms.map((form) => form.id)),
            },
            status: STATUS.NEW,
          },
          relations: {
            user: true,
          },
        });

        const users = await paginate(this.userRepository, options, {
          where: {
            id: In(userForms.map((form) => form.user.id)),
          },
        });

        return users;
      default:
        throw new BadRequestException();
    }
  }
}
