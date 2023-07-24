import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { AccessControllService } from 'src/access-controll/access-controll.service';
import { UserFormService } from 'src/user-form/user-form.service';
import { UserService } from 'src/user/user.service';
import { ROLES } from '../enums/roles.enum';

@Injectable()
export class UserIsUserOrHrOrManagerOfThatUserGuard implements CanActivate {
  constructor(
    private readonly userService: UserService,
    private readonly userFormService: UserFormService,
    private readonly accessControllService: AccessControllService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    console.log(123);
    let hasUserIsUserPermission = false;
    let hasManagerOfThatUserPermission = false;
    let hasHRPermission = false;

    const request = context.switchToHttp().getRequest<Request>();

    const user = request.user as any;

    const userInDB = await this.userService.findOne({
      id: user.sub,
    });

    const userForm = await this.userFormService.getOne(+request.params.id);

    const userRole = await this.accessControllService.findUserRoles(
      userInDB.id,
    );

    switch (userRole.role.name) {
      case ROLES.HR:
        hasHRPermission = true;
        break;
      case ROLES.MANAGER:
        const managedUser =
          await this.userService.findEmployeeOfASpecificManager(userInDB.id);
        hasManagerOfThatUserPermission =
          userInDB &&
          managedUser.map((user) => user.id).includes(userForm.user.id);
        break;
      case ROLES.EMPLOYEE:
        hasUserIsUserPermission = userInDB && userInDB.id === userForm.user.id;
        break;
    }

    return (
      hasHRPermission ||
      hasUserIsUserPermission ||
      hasManagerOfThatUserPermission
    );
  }
}
