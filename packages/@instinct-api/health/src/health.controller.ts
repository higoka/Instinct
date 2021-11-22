import {Health} from '@instinct-prj/interface';
import {Controller, Get} from '@nestjs/common';
import {
  ConfigRepository,
  databaseType,
  RoomRepository,
  UserRepository,
} from '@instinct-api/database';

@Controller('health')
export class HealthController {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly roomRepo: RoomRepository,
    private readonly configRepo: ConfigRepository
  ) {}

  @Get()
  async getHealth(): Promise<Health> {
    const config = await this.configRepo.getConfig();
    const health: [[{online_users: string}], [{active_rooms: string}]] =
      await Promise.all([
        this.userRepo
          .getInstance()
          .query(
            'SELECT COUNT(*) AS "online_users" FROM users WHERE online = \'1\''
          ),
        this.roomRepo
          .getInstance()
          .query(
            databaseType === 'arcturus'
              ? 'SELECT COUNT(*) AS "active_rooms" FROM rooms WHERE users > 0'
              : 'SELECT COUNT(*) AS "active_rooms" FROM rooms WHERE users_now > 0'
          ),
      ]);

    return {
      maintenanceMode: config.maintenanceEnabled === 1,
      usersOnline: Number(health[0][0].online_users),
      roomsActive: Number(health[1][0].active_rooms),
      systemVersion: '1.0.0',
    };
  }
}
