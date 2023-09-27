import { ArrayMinSize, IsMongoId, IsNotEmpty, IsString, Length } from 'class-validator';
import { ObjectId } from 'mongoose';

class GroupChatDto {
  @IsNotEmpty()
  @IsString()
  @Length(2, 10)
  groupName: string;

  userIds: String[];
}

class AccessChatDto {
  @IsMongoId()
  @IsNotEmpty()
  public userId: string;
}

class RenameChatDto {
  @IsMongoId()
  @IsNotEmpty()
  public chatId: string;

  @IsMongoId()
  @IsNotEmpty()
  public userId: string;

  @IsNotEmpty()
  @IsString()
  @Length(2, 20)
  public chatName: string;
}

class AddOrRemoveUserFromChatDto {
  @IsMongoId()
  @IsNotEmpty()
  public chatId: string;

  @IsMongoId()
  @IsNotEmpty()
  public userId: string;

  @IsMongoId()
  @IsNotEmpty()
  public adminId: string;
}

export { GroupChatDto, AccessChatDto, RenameChatDto, AddOrRemoveUserFromChatDto };
