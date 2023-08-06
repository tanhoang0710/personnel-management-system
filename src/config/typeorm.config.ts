import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';

export default class TypeOrmConfig {
  static getOrmConfig(configService: ConfigService): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: configService.get('DB_HOST'),
      password: configService.get('DB_PASSWORD'),
      username: configService.get('DB_USERNAME'),
      database: configService.get('DB_NAME'),
      port: configService.get('DB_PORT'),
      synchronize: true, // prod ko nen lam, vi se mat du lieu
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      charset: 'utf8mb4_unicode_ci',
      // logging: true,
    };
  }
}
export const typeOrmConfigAsync: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: async (
    configService: ConfigService,
  ): Promise<TypeOrmModuleOptions> => TypeOrmConfig.getOrmConfig(configService),
  inject: [ConfigService],
};
