import { HttpException, Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async updateRefeshToken(userID: number, refreshToken: string) {
    return await this.userRepository.update(userID, { refreshToken });
  }

  async findOne(options: FindOptionsWhere<User>): Promise<User | null> {
    return await this.userRepository.findOne({
      where: options,
    });
  }

  async deleteRefreshToken(userID: number): Promise<boolean> {
    try {
      const result = await this.userRepository.update(userID, {
        refreshToken: null,
      });

      if (result.affected === 1) return true;
      return false;
    } catch (error) {
      throw new HttpException(error?.message, 500);
    }
  }
}
