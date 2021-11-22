import {Photo, PhotoReaction} from '@instinct-prj/interface';

export interface PhotoTypes {
  getAll(): Promise<Photo[]>;

  getByID(photoID: string): Promise<Photo>;

  reactByID(photoID: string, reaction: PhotoReaction): Promise<void>;
}
