import {RoomPipe} from './room.pipe';
import {Module} from '@nestjs/common';
import {RoomService} from './room.service';
import {RoomController} from './room.controller';
import {DatabaseModule} from '@instinct-api/database';

@Module({
  imports: [DatabaseModule],
  controllers: [RoomController],
  providers: [RoomPipe, RoomService],
  exports: [RoomPipe, RoomService],
})
export class RoomModule {}
