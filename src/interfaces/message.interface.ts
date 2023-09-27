import User from './user.interface';

interface Message {
  sender: User;
  content: string;
  chat: User;
}

export default Message;
