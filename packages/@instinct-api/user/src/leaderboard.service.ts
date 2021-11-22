import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository, SelectQueryBuilder} from 'typeorm';
import {UserEntity, UserEntityStruct} from '@instinct-api/database';

@Injectable()
export class UserLeaderBoardService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntityStruct>
  ) {}

  getMostCredits(limit = 10): Promise<UserEntityStruct[]> {
    return this.queryBuilder()
      .orderBy('user.credits', 'DESC')
      .limit(limit)
      .getMany();
  }

  getMostPixels(limit = 10): Promise<UserEntityStruct[]> {
    return this.queryBuilder()
      .orderBy('user.pixels', 'DESC')
      .limit(limit)
      .getMany();
  }

  getMostPoints(limit = 10): Promise<UserEntityStruct[]> {
    return this.queryBuilder()
      .orderBy('user.points', 'DESC')
      .limit(limit)
      .getMany();
  }

  private queryBuilder(): SelectQueryBuilder<UserEntityStruct> {
    return this.userRepository
      .createQueryBuilder('user')
      .innerJoin('user.rank', 'rank', 'rank.websiteShowStaff = :showStaff', {
        showStaff: '0',
      });
  }
}
