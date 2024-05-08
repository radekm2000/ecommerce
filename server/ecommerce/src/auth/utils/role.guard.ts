import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Type,
  mixin,
} from '@nestjs/common';
import { UserRole } from 'src/utils/dtos/types';
import { AuthGuard } from '../auth.guard';
import { AuthUser } from 'src/decorators/user.decorator';

export const RoleGuard = (role: UserRole): Type<CanActivate> => {
  @Injectable()
  class RoleGuardMixin extends AuthGuard {
    async canActivate(context: ExecutionContext) {
      await super.canActivate(context);
      const request = context.switchToHttp().getRequest();
      const user = request.user as AuthUser;
      return user.role.includes(role);
    }
  }
  return mixin(RoleGuardMixin);
};
