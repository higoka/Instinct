import {Request} from 'express';
import {UserEntityStruct} from '@instinct-api/database';

export interface RequestWithSession extends Request {
  user: UserEntityStruct;
}
