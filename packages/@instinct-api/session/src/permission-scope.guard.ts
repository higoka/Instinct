import {Reflector} from '@nestjs/core';
import {RequestWithSession} from './session.type';
import {Permissions} from '@instinct-prj/interface';
import {PermissionStatus} from '@instinct-api/database';
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class PermissionScopeGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const scope: keyof Permissions = this.reflector.get(
      'scope',
      context.getHandler()
    );
    const request: RequestWithSession = context.switchToHttp().getRequest();
    const hasScope = request?.user?.rank?.[scope] === PermissionStatus.Enabled;

    if (!hasScope) {
      throw new ForbiddenException("You don't have permission to do this");
    }

    return true;
  }
}
