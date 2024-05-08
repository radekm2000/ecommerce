import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { UserRole } from 'src/utils/dtos/types';

export const AuthUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user as AuthUser;
  },
);

export type AuthUser = {
  sub: number;
  iat: number;
  exp: number;
  role: UserRole;
};
