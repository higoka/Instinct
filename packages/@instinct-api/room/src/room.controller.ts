import {RoomPipe} from './room.pipe';
import {FindConditions} from 'typeorm';
import {Room} from '@instinct-prj/interface';
import {RoomFilterDTO} from './room-filter.dto';
import {Controller, Get, Param, Query} from '@nestjs/common';
import {
  OrderBy,
  RoomEntityStruct,
  RoomRepository,
  roomWire,
  UserRepository,
} from '@instinct-api/database';

@Controller('rooms')
export class RoomController {
  constructor(
    private readonly roomRepo: RoomRepository,
    private readonly userRepo: UserRepository
  ) {}

  @Get()
  async getAll(@Query() roomFilterDTO: RoomFilterDTO): Promise<Room[]> {
    const [where, sort]: [
      FindConditions<RoomEntityStruct>,
      OrderBy<RoomEntityStruct>
    ] = [{}, {}];

    const user = await this.userRepo.findOneOrFail({
      username: roomFilterDTO.owner,
    });

    if (roomFilterDTO.owner) {
      where.ownerID = user.id!;
    }

    const rooms: RoomEntityStruct[] = await this.roomRepo.find(where, sort);
    return rooms.map(room => roomWire(room));
  }

  @Get('most_popular')
  async getMostPopular(): Promise<Room[]> {
    const mostPopularRooms: RoomEntityStruct[] = await this.roomRepo.find(
      undefined,
      {
        usersMax: 'DESC',
      }
    );
    return mostPopularRooms.map(room => roomWire(room));
  }

  @Get(':roomID')
  getByID(@Param('roomID', RoomPipe) room: RoomEntityStruct): Room {
    return roomWire(room);
  }
}
