import { Schema, model } from 'mongoose';
import { Chat } from '@interfaces';

const chatSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    isGroupChat: {
      type: Boolean,
      required: true,
    },
    users: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
    latestMessage: {
      type: Schema.Types.ObjectId,
      ref: 'Message',
    },
    groupAdmin: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  {
    timestamps: true,
  },
);

export default model<Chat>('Chat', chatSchema);
