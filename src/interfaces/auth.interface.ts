import { Request } from 'express';
import { User } from '@interfaces';

interface DataStoredInToken {
  _id: string;
}

interface TokenData {
  token: string;
  expiresIn: number;
}

interface RequestWithUser extends Request {
  user: User;
}

export { DataStoredInToken, TokenData, RequestWithUser };
