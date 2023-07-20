import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from './dto/sign-in.dto';
import { UserService } from 'src/user/user.service';
import { SignUpDto } from './dto/sign-up.dto';
import { User } from 'src/user/entities/user.entity';
import { AccessControllService } from 'src/access-controll/access-controll.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly userService: UserService,
    private readonly accessControllService: AccessControllService,
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

  async signUpEmployee(signUpDto: SignUpDto): Promise<User> {
    const newUser = await this.userService.createOne(signUpDto);
    await Promise.all([
      this.accessControllService.createOne({
        roleId: 5,
        permissionId: 1,
        userId: newUser.id,
      }),
      this.accessControllService.createOne({
        roleId: 5,
        permissionId: 3,
        userId: newUser.id,
      }),
    ]);
    return newUser;
  }

  async signUpManager(signUpDto: SignUpDto): Promise<User> {
    const newUser = await this.userService.createOne(signUpDto);
    await Promise.all([
      this.accessControllService.createOne({
        roleId: 4,
        permissionId: 1,
        userId: newUser.id,
      }),
      this.accessControllService.createOne({
        roleId: 4,
        permissionId: 3,
        userId: newUser.id,
      }),
      this.accessControllService.createOne({
        roleId: 4,
        permissionId: 5,
        userId: newUser.id,
      }),
    ]);
    return newUser;
  }

  async signUpHr(signUpDto: SignUpDto): Promise<User> {
    const newUser = await this.userService.createOne(signUpDto);
    await Promise.all([
      this.accessControllService.createOne({
        roleId: 3,
        permissionId: 1,
        userId: newUser.id,
      }),
      this.accessControllService.createOne({
        roleId: 3,
        permissionId: 2,
        userId: newUser.id,
      }),
      this.accessControllService.createOne({
        roleId: 3,
        permissionId: 3,
        userId: newUser.id,
      }),
      this.accessControllService.createOne({
        roleId: 3,
        permissionId: 5,
        userId: newUser.id,
      }),
    ]);
    return newUser;
  }

  async signUpDirector(signUpDto: SignUpDto): Promise<User> {
    const newUser = await this.userService.createOne(signUpDto);
    await Promise.all([
      this.accessControllService.createOne({
        roleId: 2,
        permissionId: 1,
        userId: newUser.id,
      }),
      this.accessControllService.createOne({
        roleId: 2,
        permissionId: 2,
        userId: newUser.id,
      }),
      this.accessControllService.createOne({
        roleId: 2,
        permissionId: 3,
        userId: newUser.id,
      }),
      this.accessControllService.createOne({
        roleId: 2,
        permissionId: 5,
        userId: newUser.id,
      }),
    ]);
    return newUser;
  }
}
