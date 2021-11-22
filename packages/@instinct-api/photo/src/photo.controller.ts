import {Photo, PhotoReaction} from '@instinct-prj/interface';
import {Controller, Get, Param, Put} from '@nestjs/common';
import {
  PhotoEntityStruct,
  PhotoRepository,
  photoWire,
  UserEntityStruct,
  PhotoReactionRepository,
} from '@instinct-api/database';
import {GetSession, HasSession} from '@instinct-api/session';
import {PhotoPipe} from './photo.pipe';

@Controller('photos')
@HasSession()
export class PhotoController {
  constructor(
    private readonly photoRepo: PhotoRepository,
    private readonly photoReactionRepo: PhotoReactionRepository
  ) {}

  @Get()
  async getAll(): Promise<Photo[]> {
    const photos: PhotoEntityStruct[] = await this.photoRepo.find(
      {},
      {id: 'DESC'}
    );
    return photos.map(photo => photoWire(photo));
  }

  @Get(':photoID')
  getByID(@Param('photoID', PhotoPipe) photo: PhotoEntityStruct): Photo {
    return photoWire(photo);
  }

  @Put(':photoID/reactions/like')
  async likeByID(
    @Param('photoID', PhotoPipe) photo: PhotoEntityStruct,
    @GetSession() user: UserEntityStruct
  ) {
    const existingReaction = await this.photoReactionRepo.findOne({
      photoID: photo.id!,
      userID: user.id!,
    });

    if (existingReaction) {
      await this.photoReactionRepo.update(
        {id: existingReaction.id!},
        {reaction: PhotoReaction.Like}
      );
      return;
    }

    await this.photoReactionRepo.create({
      photoID: photo.id!,
      userID: user.id!,
      reaction: PhotoReaction.Like,
    });
  }

  @Put(':photoID/reactions/dislike')
  async dislikeByID(
    @Param('photoID', PhotoPipe) photo: PhotoEntityStruct,
    @GetSession() user: UserEntityStruct
  ) {
    const existingReaction = await this.photoReactionRepo.findOneOrFail({
      photoID: photo.id!,
      userID: user.id!,
    });

    if (existingReaction) {
      await this.photoReactionRepo.update(
        {id: existingReaction.id!},
        {reaction: PhotoReaction.Dislike}
      );
      return;
    }

    await this.photoReactionRepo.create({
      photoID: photo.id!,
      userID: user.id!,
      reaction: PhotoReaction.Dislike,
    });
  }
}
