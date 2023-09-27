import { NextFunction, Request, Response } from 'express';
import { RequestWithUser, User } from '@interfaces';
import { UserService } from '@services';

class UserController {
  public userService = new UserService();

  public getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllUsersData: User[] = await this.userService.findAllUser();

      res.status(200).json({ data: findAllUsersData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId: string = req.params.id;
      const findOneUserData: User = await this.userService.findUserById(userId);

      res.status(200).json({ data: findOneUserData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: User = req.body;

      const { tokenData, createUserData } = await this.userService.createUser(userData);

      res.status(201).json({
        data: {
          user: createUserData,
          token: tokenData.token,
        },
        message: 'created',
      });
    } catch (error) {
      next(error);
    }
  };

  public updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId: string = req.params.id;
      const userData: User = req.body;
      const updateUserData: User = await this.userService.updateUser(userId, userData);

      res.status(200).json({ data: updateUserData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId: string = req.params.id;
      const deleteUserData: User = await this.userService.deleteUser(userId);

      res.status(200).json({ data: deleteUserData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };

  public searchUser = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const { name } = req.params;
      const usersData: User[] = await this.userService.searchUser(name, req.user._id.toString());

      res.status(200).json({ data: usersData, message: 'Search results for names' });
    } catch (error) {
      next(error);
    }
  };
}

export default UserController;
