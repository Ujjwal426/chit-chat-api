import Message from './message.interface';
import User from './user.interface';

interface Chat {
  name: string;
  isGroupChat: boolean;
  users: [User];
  latestMessage: Message;
  groupAdmin: [User];
}

export default Chat;
