import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { JwtAccessTokenGuard } from './guards/jwtAccessToken.guard';
import { GetCurrentUserId } from 'src/common/decorators/get-current-user-id.decorator';
import { JwtRefreshTokenGuard } from './guards/jwtRefreshToken.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/common/decorators/roles.decorator';
import { ROLES } from 'src/common/enums/roles.enum';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { SignUpDto } from './dto/sign-up.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-in')
  @HttpCode(HttpStatus.OK)
  async signIn(@Body() signInDto: SignInDto) {
    return await this.authService.signIn(signInDto);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAccessTokenGuard)
  @ApiBearerAuth('access-token')
  async logout(@GetCurrentUserId() userId: number) {
    return await this.authService.logout(userId);
  }

  @Post('refresh')
  @UseGuards(JwtRefreshTokenGuard)
  @ApiBearerAuth('refresh-token')
  @HttpCode(HttpStatus.OK)
  async refreshAccessToken(@GetCurrentUserId() userId: number) {
    return await this.authService.getNewAccessToken(userId);
  }

  @Post('sign-up/employee')
  @Roles(ROLES.ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAccessTokenGuard)
  @ApiBearerAuth('access-token')
  async signUpEmployee(@Body() signUpDto: SignUpDto) {
    return this.authService.signUpEmployee(signUpDto);
  }

  @Post('sign-up/manager')
  @Roles(ROLES.ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAccessTokenGuard)
  @ApiBearerAuth('access-token')
  async signUpManager(@Body() signUpDto: SignUpDto) {
    return this.authService.signUpManager(signUpDto);
  }

  @Post('sign-up/hr')
  @Roles(ROLES.ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAccessTokenGuard)
  @ApiBearerAuth('access-token')
  async signUpHr(@Body() signUpDto: SignUpDto) {
    return this.authService.signUpHr(signUpDto);
  }

  @Post('sign-up/director')
  @Roles(ROLES.ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAccessTokenGuard)
  @ApiBearerAuth('access-token')
  async signUpDirector(@Body() signUpDto: SignUpDto) {
    return this.authService.signUpDirector(signUpDto);
  }
}
