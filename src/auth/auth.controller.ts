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

  @Post('sign-up')
  @Roles(ROLES.ADMIN)
  async signUp() {
    return 123;
  }
}
