import {RoomEntityStruct} from './index';
import {userWire} from '../user';
import {Room} from '@instinct-prj/interface';

export function roomWire(roomEntity: RoomEntityStruct): Room {
  return {
    id: roomEntity.id!,
    user: roomEntity.owner ? userWire(roomEntity.owner!) : undefined,
    name: roomEntity.name,
    desc: roomEntity.description,
    currentUsers: roomEntity.users,
    maxUsers: roomEntity.usersMax,
  };
}
