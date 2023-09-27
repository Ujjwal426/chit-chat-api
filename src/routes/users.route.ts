import { Router } from 'express';
import { UserController } from '@controllers';
import { CreateUserDto } from '@dtos';
import { Routes } from '@interfaces';
import { AuthMiddleware, ValidationMiddleware } from '@middlewares';

class UserRoute implements Routes {
  public path = '/users';

  public router = Router();

  public user = new UserController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.user.getUsers);
    this.router.get(`${this.path}/:id`, this.user.getUserById);
    this.router.post(`${this.path}`, ValidationMiddleware(CreateUserDto, false), this.user.createUser);
    this.router.put(`${this.path}/:id`, ValidationMiddleware(CreateUserDto, false, true), AuthMiddleware, this.user.updateUser);
    this.router.delete(`${this.path}/:id`, AuthMiddleware, this.user.deleteUser);
    this.router.get(`${this.path}/search/:name`, AuthMiddleware, this.user.searchUser);
  }
}

export default UserRoute;
