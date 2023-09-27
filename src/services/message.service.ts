import HttpException from '@/exceptions/httpException';
import { Message } from '@/interfaces';
import { ChatModel, MessageModel, UserModel } from '@/models';
import mongoose from 'mongoose';

class MessageService {
  public sendMessage = async (content: string, userId: string, chatId: string): Promise<Message> => {
    const isChatExist = await ChatModel.findById({ _id: chatId });

    if (!isChatExist) {
      throw new HttpException(400, 'Chat does not exist');
    }

    const userIds = isChatExist.users;
    let objectIdForUser = new mongoose.Types.ObjectId(userId);

    if (!userIds.find((user: any) => user.equals(objectIdForUser))) {
      throw new HttpException(400, 'You are not the part of the group');
    }

    const isUserExist = await UserModel.findById({ _id: userId });

    if (!isUserExist) {
      throw new HttpException(400, 'User does not exist');
    }

    const newMessage = {
      content,
      sender: userId,
      chat: chatId,
    };

    let message = await (await (await MessageModel.create(newMessage)).populate('sender', 'name profilePicture')).populate('chat');
    // message = await UserModel.populate(message, {
    //   path: 'chat.users',
    //   select: 'name profilePicture email',
    // });
    await ChatModel.findByIdAndUpdate(chatId, {
      latestMessage: message,
    });
    return message;
  };

  public fetchAllMessageForAChat = async (userId: string, chatId: string): Promise<Message[]> => {
    const isChatExist = await ChatModel.findById({ _id: chatId });

    if (!isChatExist) {
      throw new HttpException(400, 'Chat does not exist');
    }

    const userIds = isChatExist.users;
    let objectIdForUser = new mongoose.Types.ObjectId(userId);

    if (!userIds.find((user: any) => user.equals(objectIdForUser))) {
      throw new HttpException(400, 'You are not the part of the group');
    }

    const isUserExist = await UserModel.findById({ _id: userId });

    if (!isUserExist) {
      throw new HttpException(400, 'User does not exist');
    }

    const message: Message[] = await MessageModel.find({ chat: chatId }).populate('sender', 'name profilePicture').populate('chat');
    return message;
  };
}

export default MessageService;
