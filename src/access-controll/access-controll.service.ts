import { BadRequestException, Injectable } from '@nestjs/common';
import { FindOptionsWhere, Repository } from 'typeorm';
import { AccessControll } from './entities/access-controll.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAccessControllDto } from './dto/create-access-controll.dto';

@Injectable()
export class AccessControllService {
  constructor(
    @InjectRepository(AccessControll)
    private readonly accessControllRepository: Repository<AccessControll>,
  ) {}

  async findAll(
    options: FindOptionsWhere<AccessControll>,
  ): Promise<AccessControll[] | null> {
    return await this.accessControllRepository.find({
      where: options,
      relations: {
        permission: true,
        role: true,
      },
      select: {
        createdAt: false,
        updatedAt: false,
        role: {
          name: true,
        },
        permission: {
          name: true,
        },
      },
    });
  }

  async createOne(createAccessControllDto: CreateAccessControllDto) {
    try {
      const newRecord = await this.accessControllRepository.save({
        user: {
          id: createAccessControllDto.userId,
        },
        role: {
          id: createAccessControllDto.roleId,
        },
        permission: {
          id: createAccessControllDto.permissionId,
        },
      });
      return newRecord;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
