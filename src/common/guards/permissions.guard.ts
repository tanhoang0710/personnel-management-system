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
import { PERMISSIONS } from '../enums/permissions.enum';
import { PERMISSIONS_KEY } from '../decorators/permission.decorator';

@Injectable()
export class PermissionsGuard implements CanActivate {
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

    const requiredPermissions = this.reflector.getAllAndOverride<PERMISSIONS[]>(
      PERMISSIONS_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) {
      return true;
    }

    if (!requiredPermissions) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();

    const userInDB = await this.userService.findOne({
      id: user.sub,
    });

    if (!userInDB) throw new BadRequestException('User have been deleted!');

    const accessControlls = await this.accessControllService.findAll({
      user: userInDB,
    });
    console.log(
      '🚀 ~ file: permissions.guard.ts:53 ~ PermissionsGuard ~ canActivate ~ accessControlls:',
      accessControlls,
    );

    let hasRoles = false;
    let hasPermissions = false;

    for (let i = 0; i < requiredRoles.length; i++) {
      for (let j = 0; j < accessControlls.length; j++) {
        if (requiredRoles[i] === accessControlls[j].role.name) {
          hasRoles = true;
        }
      }
    }

    console.log('123123123');

    for (let i = 0; i < requiredPermissions.length; i++) {
      for (let j = 0; j < accessControlls.length; j++) {
        if (requiredPermissions[i] === accessControlls[j].permission.name) {
          console.log({
            rq: requiredPermissions[i],
            name: accessControlls[j].permission.name,
          });
          hasPermissions = true;
        }
      }
    }

    return hasRoles && hasPermissions;
  }
}
