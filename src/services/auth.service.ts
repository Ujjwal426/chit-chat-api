/* eslint-disable no-underscore-dangle */
/* eslint-disable class-methods-use-this */
/* eslint-disable import/no-extraneous-dependencies */
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { SECRET_KEY } from '@config';
import HttpException from '@exceptions/httpException';
import { DataStoredInToken, TokenData, User } from '@interfaces';
import { UserModel } from '@models';

class AuthService {
  public createToken = (user: User): TokenData => {
    const dataStoredInToken: DataStoredInToken = { _id: user._id };
    const expiresIn: number = 60 * 60;

    return { expiresIn, token: sign(dataStoredInToken, SECRET_KEY, { expiresIn }) };
  };

  public async login(userData: User): Promise<{ tokenData: TokenData; findUser: User }> {
    const findUser: User = await UserModel.findOne({ email: userData.email });
    if (!findUser) throw new HttpException(409, `This email ${userData.email} was not found`);

    const isPasswordMatching: boolean = await compare(userData.password, findUser.password);
    if (!isPasswordMatching) throw new HttpException(409, 'Password is not matching');

    const tokenData = this.createToken(findUser);

    return { tokenData, findUser };
  }

  public async logout(userData: User): Promise<User> {
    const findUser: User = await UserModel.findOne({ email: userData.email, password: userData.password });
    if (!findUser) throw new HttpException(409, `This email ${userData.email} was not found`);

    return findUser;
  }
}

export default AuthService;
