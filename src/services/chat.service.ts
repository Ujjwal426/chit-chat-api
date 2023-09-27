/* eslint-disable class-methods-use-this */
import { ChatModel, UserModel } from '@models';
import { Chat } from '@interfaces';
import HttpException from '@exceptions/httpException';
import mongoose from 'mongoose';

class ChatService {
  public accessOrCreateChat = async (userId: string, ownUserId: string): Promise<Chat> => {
    const isUserExist = await UserModel.findById({ _id: userId });

    if (!isUserExist) {
      throw new HttpException(400, `user is not exist`);
    }

    const isChatExist: Chat[] = await ChatModel.find({
      isGroupChat: false,
      $and: [{ users: { $elemMatch: { $eq: userId } } }, { users: { $elemMatch: { $eq: ownUserId } } }],
    })
      .populate('users', '-password')
      .populate('latestMessage')
      .populate('latestMessage.sender');
    if (isChatExist.length > 0) {
      return isChatExist[0];
    }

    const chatData = { name: 'sender', users: [userId, ownUserId], isGroupChat: false };

    const createChat: Chat = await ChatModel.create(chatData);

    return createChat;
  };

  public fetchAllChatsForAUser = async (userId: string): Promise<Chat[]> => {
    const isUserExist = await UserModel.findById({ _id: userId });

    if (!isUserExist) {
      throw new HttpException(400, `user is not exist`);
    }

    const Chats: Chat[] = await ChatModel.find({ users: { $elemMatch: { $eq: userId } } })
      .populate('users', '-password')
      .populate('groupAdmin', '-password')
      .populate('latestMessage')
      .populate('latestMessage.sender')
      .sort({ updatedAt: -1 });
    return Chats;
  };

  public createGroupChat = async (userIdArray: Array<String>, groupName: string, ownUserId: string): Promise<Chat> => {
    userIdArray.push(ownUserId);

    if (userIdArray.length <= 2) {
      throw new HttpException(400, `You can't create a group 2 users`);
    }

    const isAllUsersExist = await UserModel.find({ _id: { $in: userIdArray } });
    if (!isAllUsersExist) {
      throw new HttpException(400, `users does not exist`);
    }

    const chatData = { name: groupName, users: userIdArray, isGroupChat: true, groupAdmin: [ownUserId] };
    const createGroupChat: Chat = await ChatModel.create(chatData);
    return createGroupChat;
  };

  public renameGroupChat = async (chatId: string, chantName: string, userId: any): Promise<Chat> => {
    const isChatExist: Chat = await ChatModel.findById({ _id: chatId });
    if (!isChatExist) {
      throw new HttpException(400, 'Group not exist');
    }
    if (isChatExist.users.indexOf(userId) === -1) {
      throw new HttpException(400, 'You are not the part of the group');
    }
    if (!isChatExist.isGroupChat) {
      throw new HttpException(400, 'You can not the rename the personal chat');
    }
    const Chat = await ChatModel.findByIdAndUpdate(chatId, { name: chantName }, { new: true })
      .populate('users', '-password')
      .populate('groupAdmin', '-password');

    return Chat;
  };

  public addUserToChat = async (chatId: string, userId: any, adminId: any): Promise<Chat> => {
    const isChatExist: Chat = await ChatModel.findById({ _id: chatId });
    if (!isChatExist) {
      throw new HttpException(400, 'Group does not exist');
    }

    if (!isChatExist.isGroupChat && isChatExist.users.length === Number(2)) {
      throw new HttpException(400, 'You can more than one user to the personal chat');
    }

    if (isChatExist.groupAdmin.indexOf(adminId) === -1) {
      throw new HttpException(400, 'Only Admin allow to add user in the group');
    }
    const isUserExist = await UserModel.findById({ _id: userId });
    if (!isUserExist) {
      throw new HttpException(400, 'User does not exist');
    }
    const userAlreadyExistInChat = isChatExist.users;
    userAlreadyExistInChat.push(userId);
    const updateUserInChat: Chat = await ChatModel.findByIdAndUpdate(chatId, { users: userAlreadyExistInChat }, { new: true })
      .populate('users', '-password')
      .populate('groupAdmin', '-password');

    return updateUserInChat;
  };

  public removeUserFormChat = async (chatId: string, userId: any, adminId: any): Promise<Chat> => {
    const isChatExist: any = await ChatModel.findById({ _id: chatId });
    if (!isChatExist) {
      throw new HttpException(400, 'Group does not exist');
    }

    if (adminId !== userId && isChatExist.groupAdmin.indexOf(adminId) === -1) {
      throw new HttpException(400, 'Only Admin allow to remove user from the group');
    }

    if (isChatExist.users.indexOf(userId) === -1) {
      throw new HttpException(400, 'User is not the part of the group');
    }
    const userIds = isChatExist.users;
    let objectIdToRemove = new mongoose.Types.ObjectId(userId);
    const removeUserFromTheGroup = userIds.filter((user: any) => !user.equals(objectIdToRemove));
    
    const removeUserFromChat: Chat = await ChatModel.findByIdAndUpdate(chatId, { users: removeUserFromTheGroup }, { new: true })
      .populate('users', '-password')
      .populate('groupAdmin', '-password');

    return removeUserFromChat;
  };
}

export default ChatService;
