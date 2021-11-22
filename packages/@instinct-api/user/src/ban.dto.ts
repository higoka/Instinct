import {UserBanDTO} from '@instinct-prj/interface';
import {UserEntityStruct, UserBanEntityStruct} from '@instinct-api/database';
import {IsNotEmpty, IsNumber, IsString} from 'class-validator';

export class UserBanDTOClass implements UserBanDTO {
  @IsNumber()
  userID!: number;

  @IsString()
  @IsNotEmpty()
  reason!: string;

  @IsNumber()
  banStart!: number;

  @IsNumber()
  banEnd!: number;
}

export function userBanDataTransferObjectToEntity(
  userBanDTO: UserBanDTO,
  user: UserEntityStruct
): Partial<UserBanEntityStruct> {
  return {
    user,
    banReason: userBanDTO.reason,
    banStartedTimestamp: userBanDTO.banStart,
    banExpirationTimestamp: userBanDTO.banEnd,
  };
}
