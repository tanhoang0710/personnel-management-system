import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserFormDetail } from './entities/user-form-detail.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { AccessControllService } from 'src/access-controll/access-controll.service';
import { UserFormService } from 'src/user-form/user-form.service';
import { CreateUserFormDetailDto } from './dto/create-user-form-detail.dto';

@Injectable()
export class UserFormDetailService {
  constructor(
    @InjectRepository(UserFormDetail)
    private readonly userFormDetailRepository: Repository<UserFormDetail>,
    private readonly userService: UserService,
    private readonly accessControllService: AccessControllService,
    private readonly userFormService: UserFormService,
  ) {}

  async createOne(createUserFormDetailDto: CreateUserFormDetailDto) {
    return await this.userFormDetailRepository.save({
      ...createUserFormDetailDto,
      userForm: {
        id: createUserFormDetailDto.userFormId,
      },
    });
  }
}
