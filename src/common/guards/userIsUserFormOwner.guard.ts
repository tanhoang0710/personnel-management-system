import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { UserFormService } from 'src/user-form/user-form.service';

@Injectable()
export class UserIsUserFormOwnerGuard implements CanActivate {
  constructor(private readonly userFormService: UserFormService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    const user = request.user as any;

    const userForm = await this.userFormService.getOne(
      request.body.userFormId ?? request.params.id,
    );
    return user.sub === userForm.user.id;
  }
}
