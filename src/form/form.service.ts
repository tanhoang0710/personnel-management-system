import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Form } from './entities/form.entity';
import { LessThan, Repository } from 'typeorm';
import { CreateFormDto } from './dto/create-form.dto';
import { FORM_CATEGORIES } from 'src/common/enums/formCategories.enum';
import { UserService } from 'src/user/user.service';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class FormService {
  constructor(
    @InjectRepository(Form)
    private readonly formRepository: Repository<Form>,
    private readonly userService: UserService,
    private readonly mailService: MailService,
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
      throw new BadRequestException(error.message);
    }
  }

  async getAllByTypeAndGreaterThanDueDate(type: FORM_CATEGORIES) {
    try {
      const forms = await this.formRepository.find({
        where: {
          formCategory: {
            name: type,
          },
          dueDate: LessThan(new Date()),
        },
      });
      return forms;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async assignForEmployee(formId: number, userId: number) {
    try {
      const user = await this.userService.findOne({
        id: userId,
      });

      if (!user) throw new NotFoundException('No user with that id!');

      await this.mailService.sendMailAssignForm(user.email, formId);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
