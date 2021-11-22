import {Controller, Get} from '@nestjs/common';
import {UserEntityStruct} from '@instinct-api/database';
import {FindRetrosService} from './findretros.service';
import {GetSession, HasSession} from '@instinct-api/session';

@Controller('session/findretros')
@HasSession()
export class FindRetrosController {
  constructor(private readonly findRetrosService: FindRetrosService) {}

  @Get()
  async didUserVote(@GetSession() user: UserEntityStruct): Promise<boolean> {
    return this.findRetrosService.didIPVote(user.ipCurrent);
  }
}
