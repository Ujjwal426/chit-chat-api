/* eslint-disable prefer-template */
/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */
// eslint-disable-next-line import/no-extraneous-dependencies
import { hash } from 'bcryptjs';
import HttpException from '@exceptions/httpException';
import { TokenData, User } from '@interfaces';
import { UserModel } from '@models';
import AuthService from './auth.service';

class UserService {
  private authService = new AuthService();

  public async findAllUser(): Promise<User[]> {
    const users: User[] = await UserModel.find();
    return users;
  }

  public async findUserById(userId: string): Promise<User> {
    const findUser: User = await UserModel.findOne({ _id: userId });
    if (!findUser) throw new HttpException(409, "User doesn't exist");

    return findUser;
  }

  public async createUser(userData: User): Promise<{ tokenData: TokenData; createUserData: User }> {
    const findUser: User = await UserModel.findOne({ email: userData.email });
    if (findUser) throw new HttpException(409, `This email ${userData.email} already exists`);

    const hashedPassword = await hash(userData.password, 10);
    const createUserData: User = await UserModel.create({ ...userData, password: hashedPassword });

    const tokenData = this.authService.createToken(createUserData);

    return { tokenData, createUserData };
  }

  public async updateUser(userId: string, userData: User): Promise<User> {
    if (userData.email) {
      const findUser: User = await UserModel.findOne({ email: userData.email });
      // eslint-disable-next-line no-underscore-dangle
      if (findUser && findUser._id !== userId) throw new HttpException(409, `This email ${userData.email} already exists`);
    }

    if (userData.password) {
      const hashedPassword = await hash(userData.password, 10);
      userData = { ...userData, password: hashedPassword };
    }

    const updateUserById: User = await UserModel.findByIdAndUpdate(userId, { userData });
    if (!updateUserById) throw new HttpException(409, "User doesn't exist");

    return updateUserById;
  }

  public async deleteUser(userId: string): Promise<User> {
    const deleteUserById: User = await UserModel.findByIdAndDelete(userId);
    if (!deleteUserById) throw new HttpException(409, "User doesn't exist");

    return deleteUserById;
  }

  public async searchUser(name: string, userId: string): Promise<User[]> {
    const usersData: User[] = await UserModel.find({ name: { $regex: name, $options: 'i' }, _id: { $ne: userId } });
    return usersData;
  }
}

export default UserService;
