import {UserBanEntity, UserBanRepository} from '../database/entity';
import {PipeTransform, Injectable, NotFoundException} from '@nestjs/common';

@Injectable()
export class UserBanPipe implements PipeTransform {
  constructor(private readonly userBanRepo: UserBanRepository) {}

  async transform(banID: number): Promise<UserBanEntity> {
    try {
      return await this.userBanRepo.getOneByID(banID);
    } catch {
      throw new NotFoundException('Ban does not exist');
    }
  }
}