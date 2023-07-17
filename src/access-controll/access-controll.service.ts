import { Injectable } from '@nestjs/common';
import { FindOptionsWhere, Repository } from 'typeorm';
import { AccessControll } from './entities/access-controll.entity';
import { InjectRepository } from '@nestjs/typeorm';

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
}
