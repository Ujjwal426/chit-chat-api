import { Router } from 'express';
import { Routes } from '@interfaces';
import { AuthMiddleware, ValidationMiddleware } from '@middlewares';
import { MessageController } from '@/controllers';

class MessageRoute implements Routes {
  public path = '/';

  public router = Router();

  public message = new MessageController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}send-message`, AuthMiddleware, this.message.sendMessage);
    this.router.get(`${this.path}fetch-message/:chatId`, AuthMiddleware, this.message.fetchAllMessageForAChat);
  }
}

export default MessageRoute;
