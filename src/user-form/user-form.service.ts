import { UpdateUserFormByManagerDto } from './dto/update-user-form-by-manager.dto';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserForm } from './entities/user-form.entity';
import { FindOptionsWhere, In, Repository } from 'typeorm';
import { CreateUserFormDto } from './dto/create-user-form.dto';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';
import { UserService } from 'src/user/user.service';
import { AccessControllService } from 'src/access-controll/access-controll.service';
import { ROLES } from 'src/common/enums/roles.enum';
import { UpdateUserFormByEmployeeDto } from './dto/update-user-form-by-employee.dto';
import { UpdateUserFormByHrDto } from './dto/update-user-form-by-hr.dto';

@Injectable()
export class UserFormService {
  constructor(
    @InjectRepository(UserForm)
    private readonly userFormRepository: Repository<UserForm>,
    private readonly userService: UserService,
    private readonly accessControllService: AccessControllService,
  ) {}

  async createOne(createUserFormDto: CreateUserFormDto) {
    try {
      const newUserForm = await this.userFormRepository.save({
        user: {
          id: createUserFormDto.userId,
        },
        form: {
          id: createUserFormDto.formId,
        },
      });

      return newUserForm;
    } catch (error) {
      return new BadRequestException(error.message);
    }
  }

  async getAllPageable(
    userId: number,
    options: IPaginationOptions,
  ): Promise<Pagination<UserForm>> {
    const user = await this.userService.findOne({
      id: userId,
    });

    if (!user) throw new NotFoundException('No users found!');

    const userRole = await this.accessControllService.findUserRoles(userId);

    let whereOptions: FindOptionsWhere<UserForm>[] | FindOptionsWhere<UserForm>;

    switch (userRole.role.name) {
      case ROLES.HR:
        whereOptions = {};
        break;
      case ROLES.MANAGER:
        const managedUser =
          await this.userService.findEmployeeOfASpecificManager(userId);
        whereOptions = [
          {
            user: {
              id: In(managedUser.map((user) => user.id)),
            },
          },
          {
            user: {
              id: userId,
            },
          },
        ];
        break;
      case ROLES.EMPLOYEE:
        whereOptions = {
          user: {
            id: userId,
          },
        };
        break;
    }

    const userForms = await paginate(this.userFormRepository, options, {
      where: whereOptions,
      relations: {
        form: true,
        user: true,
      },
    });
    return userForms;
  }

  async getOne(id: number) {
    return this.userFormRepository.findOne({
      where: {
        id,
      },
      relations: {
        form: true,
        user: true,
        userFormDetails: true,
      },
    });
  }

  async updateOne(
    id: number,
    updateDto:
      | UpdateUserFormByEmployeeDto
      | UpdateUserFormByManagerDto
      | UpdateUserFormByHrDto,
  ) {
    const result = await this.userFormRepository.update(id, updateDto);

    if (result.affected === 1) return true;
    return false;
  }
}
