import {Module} from '@nestjs/common';
import {PhotoPipe} from './photo.pipe';
import {PhotoController} from './photo.controller';
import {DatabaseModule} from '@instinct-api/database';

@Module({
  imports: [DatabaseModule],
  controllers: [PhotoController],
  providers: [PhotoPipe],
  exports: [PhotoPipe],
})
export class PhotoModule {}
