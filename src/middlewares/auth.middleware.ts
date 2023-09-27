/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable import/no-extraneous-dependencies */
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { SECRET_KEY } from '@config';
import HttpException from '@exceptions/httpException';
import { DataStoredInToken, RequestWithUser } from '@interfaces';
import { UserModel } from '@models';


const AuthMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer')) {
      throw new HttpException(404, 'Invalid Authentication Token....');
    }
    const token = authHeader.split(' ')[1];

    if (token) {
      const { _id } = verify(token, SECRET_KEY) as DataStoredInToken;

      const findUser = await UserModel.findById(_id);
      if (findUser) {
        req.user = findUser;
        next();
      } else {
        next(new HttpException(401, 'Wrong authentication token'));
      }
    } else {
      next(new HttpException(404, 'Authentication token missing'));
    }
  } catch (error) {
    next(new HttpException(401, 'Wrong authentication token'));
  }
};

export default AuthMiddleware;
