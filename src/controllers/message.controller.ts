import { NextFunction, Request, Response } from 'express';
import { MessageService } from '@/services';
import { Message, RequestWithUser } from '@/interfaces';

class MessageController {
  private messageService = new MessageService();

  public sendMessage = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { content, userId, chatId } = req.body;
      const message: Message = await this.messageService.sendMessage(content, userId, chatId);
      res.status(200).json({ data: message, message: 'message details' });
    } catch (error) {
      next(error);
    }
  };

  public fetchAllMessageForAChat = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const { chatId } = req.params;
      const userId = req.user._id.toString();
      const message: Message[] = await this.messageService.fetchAllMessageForAChat(userId, chatId);
      res.status(200).json({ data: message, message: 'message details' });
    } catch (error) {
      next(error);
    }
  };
}

export default MessageController;
