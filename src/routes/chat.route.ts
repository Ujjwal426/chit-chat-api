/* eslint-disable import/prefer-default-export */
import { Router } from 'express';
import { ChatController } from '@controllers';
import { AccessChatDto, GroupChatDto, RenameChatDto, AddOrRemoveUserFromChatDto } from '@dtos';
import { Routes } from '@interfaces';
import { ValidationMiddleware, AuthMiddleware } from '@middlewares';

class ChatRoute implements Routes {
  public path = '/';

  public router = Router();

  public chat = new ChatController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}access-chat`, AuthMiddleware, ValidationMiddleware(AccessChatDto, false), this.chat.accessOrCreateChat);
    this.router.get(`${this.path}fetch-chat`, AuthMiddleware, this.chat.fetchAllChatsForAUser);
    this.router.post(`${this.path}group-chat`, AuthMiddleware, ValidationMiddleware(GroupChatDto, false), this.chat.createGroupChat);
    this.router.put(`${this.path}rename-group`, AuthMiddleware, ValidationMiddleware(RenameChatDto, false), this.chat.renameGroupChat);
    this.router.put(`${this.path}add-user-chat`, AuthMiddleware, ValidationMiddleware(AddOrRemoveUserFromChatDto, false), this.chat.addUserToChat);
    this.router.put(
      `${this.path}remove-user-chat`,
      AuthMiddleware,
      ValidationMiddleware(AddOrRemoveUserFromChatDto, false),
      this.chat.removeUserFormChat,
    );
  }
}

export default ChatRoute;
