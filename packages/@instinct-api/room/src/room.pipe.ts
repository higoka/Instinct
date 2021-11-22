import {RoomService} from './room.service';
import {RoomEntityStruct} from '@instinct-api/database';
import {PipeTransform, Injectable, NotFoundException} from '@nestjs/common';

@Injectable()
export class RoomPipe implements PipeTransform {
  constructor(private readonly roomService: RoomService) {}

  async transform(roomID: number): Promise<RoomEntityStruct> {
    try {
      return await this.roomService.getByID(roomID);
    } catch {
      throw new NotFoundException('Room does not exist');
    }
  }
}
