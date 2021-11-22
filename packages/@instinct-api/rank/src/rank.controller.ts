import {RankPipe} from './rank.pipe';
import {RankDTOClass} from './rank.dto';
import {Rank} from '@instinct-prj/interface';
import {HasScope} from '@instinct-api/session';
import {
  RankRepository,
  RankEntity,
  rankWire,
  rankDataTransferObjectToEntity,
  RankEntityStruct,
} from '@instinct-api/database';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

@Controller('ranks')
export class RankController {
  constructor(private readonly rankRepo: RankRepository) {}

  @Post()
  @HasScope('websiteManageRanks')
  async createRank(@Body() rankDTO: RankDTOClass): Promise<Rank> {
    const newRank = await this.rankRepo.create(
      rankDataTransferObjectToEntity(rankDTO)
    );
    return rankWire(newRank);
  }

  @Get()
  async getMany(): Promise<Rank[]> {
    const ranks: RankEntityStruct[] = await this.rankRepo.getAll();
    return ranks.map(rank => rankWire(rank));
  }

  @Get('staff')
  async getStaff(): Promise<Rank[]> {
    const ranks: RankEntityStruct[] = await this.rankRepo.getStaff();
    return ranks.map(rank => rankWire(rank));
  }

  @Get(':rankID')
  getByID(@Param('rankID', RankPipe) rank: RankEntityStruct): Rank {
    return rankWire(rank);
  }

  @Patch(':rankID')
  @HasScope('websiteManageRanks')
  async updateByID(
    @Param('rankID', RankPipe) rank: RankEntityStruct,
    @Body() rankDTO: RankDTOClass
  ): Promise<string> {
    // TODO: Implement syncing users in a rank DTO
    await this.rankRepo.update(
      {id: rank.id!},
      rankDataTransferObjectToEntity(rankDTO)
    );
    return 'Your changes have been saved';
  }

  @Delete(':rankID')
  @HasScope('websiteManageRanks')
  async deleteByID(
    @Param('rankID', RankPipe) rank: RankEntityStruct
  ): Promise<string> {
    await this.rankRepo.delete({id: rank.id!});
    return 'Rank has been deleted';
  }
}
