/* eslint-disable no-underscore-dangle */
import { NextFunction, Request, Response } from 'express';
import { RequestWithUser, Chat } from '@interfaces';
import { ChatService } from '@services';

class ChatController {
  private chatService = new ChatService();

  public accessOrCreateChat = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const { userId } = req.body;
      const owUserId = req.user._id;
      const ChatData: Chat = await this.chatService.accessOrCreateChat(userId, owUserId);
      res.status(200).json({
        data: ChatData,
        message: 'Showing your chat with your friends',
      });
    } catch (error) {
      next(error);
    }
  };

  public fetchAllChatsForAUser = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userId = req.user._id;
      const Chats: Chat[] = await this.chatService.fetchAllChatsForAUser(userId);
      res.status(200).json({
        data: Chats,
        message: 'All chats details',
      });
    } catch (error) {
      next(error);
    }
  };

  public createGroupChat = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const { usersIds, groupName } = req.body;
      const userId = req.user._id;
      const createGroupChat: Chat = await this.chatService.createGroupChat(usersIds, groupName, userId);
      res.status(201).json({
        data: createGroupChat,
        message: 'Group chat created',
      });
    } catch (error) {
      next(error);
    }
  };

  public renameGroupChat = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { chatId, chatName, userId } = req.body;
      console.log('Chat Id', chatId);
      const renameGroupChat: Chat = await this.chatService.renameGroupChat(chatId, chatName, userId);
      res.status(200).json({
        data: renameGroupChat,
        message: 'Rename group chat successfully',
      });
    } catch (error) {
      next(error);
    }
  };

  public addUserToChat = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { chatId, userId, adminId } = req.body;
      const addUserInChat: Chat = await this.chatService.addUserToChat(chatId, userId, adminId);
      res.status(200).json({
        data: addUserInChat,
        message: 'Add user in the chat successfully',
      });
    } catch (error) {
      next(error);
    }
  };

  public removeUserFormChat = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { chatId, userId, adminId } = req.body;
      const removeUserFromChat: Chat = await this.chatService.removeUserFormChat(chatId, userId, adminId);
      res.status(200).json({
        data: removeUserFromChat,
        message: 'Remove user from the chat successfully',
      });
    } catch (error) {
      next(error);
    }
  };
}

export default ChatController;
