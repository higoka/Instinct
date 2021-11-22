import {GroupPipe} from './group.pipe';
import {Module} from '@nestjs/common';
import {GroupService} from './group.service';
import {GroupController} from './group.controller';
import {DatabaseModule} from '@instinct-api/database';

@Module({
  imports: [DatabaseModule],
  controllers: [GroupController],
  providers: [GroupPipe, GroupService],
  exports: [GroupPipe, GroupService],
})
export class GroupModule {}
