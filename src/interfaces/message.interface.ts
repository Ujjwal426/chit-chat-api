import User from './user.interface';

interface Message {
  sender: User;
  content: string;
  receiver: User;
}

export default Message;
