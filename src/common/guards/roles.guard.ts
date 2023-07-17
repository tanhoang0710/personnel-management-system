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
import { AccessControllService } from 'src/access-controll/access-controll.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly userService: UserService,
    private readonly accessControllService: AccessControllService,
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

    const roles = await this.accessControllService.findAll({
      user: userInDB,
    });

    for (let i = 0; i < requiredRoles.length; i++) {
      for (let j = 0; j < roles.length; j++) {
        console.log(requiredRoles[i], roles[j].role.name);
        if (requiredRoles[i] === roles[j].role.name) return true;
      }
    }

    return false;
  }
}
