import {Repository} from 'typeorm';
import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {RoomEntity, RoomEntityStruct} from '@instinct-api/database';

@Injectable()
export class RoomService {
  private readonly eagerRelations: Array<keyof RoomEntityStruct> = ['owner'];

  constructor(
    @InjectRepository(RoomEntity)
    private readonly roomRepo: Repository<RoomEntityStruct>
  ) {}

  getAll(): Promise<RoomEntityStruct[]> {
    return this.roomRepo.find({
      relations: this.eagerRelations,
    });
  }

  getMostPopular(): Promise<RoomEntityStruct[]> {
    return this.roomRepo.find({
      relations: this.eagerRelations,
      order: {
        users: 'DESC',
      },
      take: 5,
    });
  }

  getByID(roomID: number): Promise<RoomEntityStruct> {
    return this.roomRepo.findOneOrFail({
      where: {
        id: roomID,
      },
      relations: this.eagerRelations,
    });
  }
}
