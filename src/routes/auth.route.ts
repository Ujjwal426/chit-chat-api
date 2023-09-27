/* eslint-disable import/prefer-default-export */
import { Router } from 'express';
import { AuthController } from '@controllers';
import { LoginUserDto } from '@dtos';
import { Routes } from '@interfaces';
import { AuthMiddleware, ValidationMiddleware } from '@middlewares';

class AuthRoute implements Routes {
  public path = '/';

  public router = Router();

  public auth = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}login`, ValidationMiddleware(LoginUserDto, false), this.auth.logIn);
    this.router.post(`${this.path}logout`, AuthMiddleware, this.auth.logOut);
  }
}

export default AuthRoute;
