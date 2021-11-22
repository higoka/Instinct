import {exampleUser, User} from '../user/User';

export enum PhotoReaction {
  Like = 'like',
  Dislike = 'dislike',
}

export interface Photo {
  id: number;
  createdAt: number;
  userID: number;
  user?: User;
  imagePath: string;
  reactions: UserPhotoReaction[];
}

export interface UserPhotoReaction {
  user: User;
  reaction: PhotoReaction;
}

export const examplePhoto: Photo = {
  id: 1,
  createdAt: +new Date() / 1000,
  userID: exampleUser.id,
  user: exampleUser,
  imagePath: '/photos/1.png',
  reactions: [],
};
