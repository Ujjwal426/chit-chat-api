import { NextFunction, Request, Response } from 'express';
import { RequestWithUser, User } from '@interfaces';
import { AuthService } from '@services';

class AuthController {
  private authService = new AuthService();

  public logIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: User = req.body;
      const { tokenData, findUser } = await this.authService.login(userData);
      res.status(200).json({
        data: {
          user: findUser,
          token: tokenData.token,
        },
        message: 'login',
      });
    } catch (error) {
      next(error);
    }
  };

  public logOut = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userData: User = req.user;
      const logOutUserData: User = await this.authService.logout(userData);

      res.setHeader('Set-Cookie', ['Authorization=; Max-age=0']);
      res.status(200).json({ data: logOutUserData, message: 'logout' });
    } catch (error) {
      next(error);
    }
  };
}

export default AuthController;
