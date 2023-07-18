import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SignUpDto } from 'src/auth/dto/sign-up.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

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

  async createOne(signUpDto: SignUpDto) {
    const dependant = await this.findOne({
      id: signUpDto.dependantId,
    });
    try {
      const newUser = await this.userRepository.save({
        ...signUpDto,
        dependant,
      });
      return newUser;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async updateProfile(
    updateProfileDto: UpdateProfileDto,
    id: number,
  ): Promise<boolean> {
    const result = await this.userRepository.update(id, updateProfileDto);

    if (result.affected === 1) return true;
    return false;
  }

  async updateAvatar(url: string, id: number): Promise<string> {
    const result = await this.userRepository.update(id, {
      avatar: url,
    });

    if (result.affected === 1) return url;
    return null;
  }
}
