import { JwtRefreshTokenStrategy } from './strategies/jwtRefreshToken.strategy';
import { JwtAccessTokenStrategy } from './strategies/jwtAccessToken.strategy';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [JwtModule.register({}), PassportModule, UserModule],
  controllers: [AuthController],
  providers: [AuthService, JwtAccessTokenStrategy, JwtRefreshTokenStrategy],
})
export class AuthModule {}
