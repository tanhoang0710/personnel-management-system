import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { UserService } from 'src/user/user.service';
import { ROLES } from '../enums/roles.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<ROLES[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();

    const userInDB = await this.userService.findOne({
      id: user.sub,
    });

    if (!userInDB) throw new BadRequestException('User have been deleted!');

    // return requiredRoles.some((role) => {
    //   return userInDB.role?.includes(role);
    // });

    return true;
  }
}
