import {PhotoEntityStruct, PhotoRepository} from '@instinct-api/database';
import {PipeTransform, Injectable, NotFoundException} from '@nestjs/common';

@Injectable()
export class PhotoPipe implements PipeTransform {
  constructor(private readonly photoService: PhotoRepository) {}

  async transform(photoID: number): Promise<PhotoEntityStruct> {
    try {
      return await this.photoService.findOneOrFail({id: photoID});
    } catch {
      throw new NotFoundException('Photo does not exist');
    }
  }
}
