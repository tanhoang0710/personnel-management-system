import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { SignInDto } from './dto/sign-in.dto';
import { UserService } from 'src/user/user.service';
import { SignUpDto } from './dto/sign-up.dto';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {}
  async getTokens(
    userId: number,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        { sub: userId },
        {
          expiresIn: +this.configService.get<string>('JWT_ACCESS_EXPIRE'),
          secret: this.configService.get<string>('JWT_ACCESS'),
        },
      ),
      this.jwtService.signAsync(
        { sub: userId },
        {
          expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRE'),
          secret: this.configService.get<string>('JWT_REFRESH'),
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async signIn(
    signInDto: SignInDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const user = await this.userService.findOne({
      employeeCode: signInDto.employeeCode,
    });

    if (!user) throw new NotFoundException('No user found with that code');
    // const isSamePassword = await bcrypt.compare(
    //   signInDto.password,
    //   user.password,
    // );

    const isSamePassword = signInDto.password === user.password;

    if (!isSamePassword) throw new UnauthorizedException('Bad credential');
    const { accessToken, refreshToken } = await this.getTokens(user.id);
    await this.userService.updateRefeshToken(user.id, refreshToken);
    return {
      accessToken,
      refreshToken,
    };
  }

  async logout(userID: number) {
    const result = await this.userService.deleteRefreshToken(userID);
    if (!result) throw new InternalServerErrorException();
  }

  async getNewAccessToken(userID: number): Promise<{ accessToken: string }> {
    const newAccessToken = await this.jwtService.signAsync(
      { sub: userID },
      {
        expiresIn: +this.configService.get<string>('JWT_ACCESS_EXPIRE'),
        secret: this.configService.get<string>('JWT_ACCESS'),
      },
    );
    return { accessToken: newAccessToken };
  }

  async signUp(signUpDto: SignUpDto): Promise<User> {
    const newUser = await this.userService.createOne(signUpDto);
    return newUser;
  }
}
