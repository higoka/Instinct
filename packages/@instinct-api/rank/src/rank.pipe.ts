import {RankEntityStruct, RankRepository} from '@instinct-api/database';
import {PipeTransform, Injectable, NotFoundException} from '@nestjs/common';

@Injectable()
export class RankPipe implements PipeTransform {
  constructor(private readonly rankRepo: RankRepository) {}

  async transform(rankID: number): Promise<RankEntityStruct> {
    try {
      return await this.rankRepo.findOneOrFail({id: rankID});
    } catch (e) {
      throw new NotFoundException('Rank does not exist');
    }
  }
}
