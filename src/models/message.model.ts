import { Schema, model } from 'mongoose';
import { Message } from '@interfaces';

const messageSchema = new Schema(
  {
    sender: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    content: {
      type: String,
      require: true,
    },
    chat: {
      type: Schema.Types.ObjectId,
      ref: 'Chat',
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export default model<Message>('Message', messageSchema);
