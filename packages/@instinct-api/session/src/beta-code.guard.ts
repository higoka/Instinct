import {RequestWithSession} from './session.type';
import {CanActivate, ExecutionContext, Injectable} from '@nestjs/common';
import {ConfigRepository, PermissionStatus} from '@instinct-api/database';

@Injectable()
export class BetaModeGuard implements CanActivate {
  constructor(private readonly configRepo: ConfigRepository) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const config = await this.configRepo.getConfig();

    if (!config.siteBeta) {
      return true;
    }

    const request: RequestWithSession = context.switchToHttp().getRequest();

    if (
      request.user?.rank?.websiteShowAdminPanel === PermissionStatus.Enabled
    ) {
      return true;
    }

    return !!request.user?.betaCode;
  }
}
